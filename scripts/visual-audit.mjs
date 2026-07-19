import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const baseUrl = process.env.AUDIT_URL || 'http://127.0.0.1:4173'
const outputRoot = path.resolve('visual-audit/output')

fs.rmSync(outputRoot, { recursive: true, force: true })
fs.mkdirSync(outputRoot, { recursive: true })

const report = {
  baseUrl,
  createdAt: new Date().toISOString(),
  viewports: [],
  consoleErrors: [],
  pageErrors: [],
}

const browser = await chromium.launch({ headless: true })

async function captureViewport({ name, width, height, mobile, video }) {
  const viewportDir = path.join(outputRoot, name)
  const videoDir = path.join(viewportDir, 'video')
  fs.mkdirSync(viewportDir, { recursive: true })

  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    isMobile: mobile,
    hasTouch: mobile,
    reducedMotion: 'no-preference',
    recordVideo: video ? { dir: videoDir, size: { width, height } } : undefined,
  })

  const page = await context.newPage()

  page.on('console', (message) => {
    if (message.type() === 'error') {
      report.consoleErrors.push({ viewport: name, text: message.text() })
    }
  })

  page.on('pageerror', (error) => {
    report.pageErrors.push({ viewport: name, text: error.message })
  })

  await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 60_000 })
  await page.waitForTimeout(800)

  const metrics = await page.evaluate(() => {
    const story = document.querySelector('.burger-story')
    const menu = document.querySelector('#menu')
    const documentHeight = document.documentElement.scrollHeight
    const viewportHeight = window.innerHeight

    if (!story || !menu) {
      throw new Error('Expected .burger-story and #menu elements were not found')
    }

    const storyTop = story.getBoundingClientRect().top + window.scrollY
    const storyScrollable = Math.max(story.scrollHeight - viewportHeight, 1)
    const menuTop = menu.getBoundingClientRect().top + window.scrollY

    return {
      documentHeight,
      viewportHeight,
      storyTop,
      storyScrollable,
      menuTop,
    }
  })

  const positions = [
    { label: '00-hero', y: 0 },
    { label: '01-story-start', y: metrics.storyTop },
    { label: '02-story-15', y: metrics.storyTop + metrics.storyScrollable * 0.15 },
    { label: '03-story-35', y: metrics.storyTop + metrics.storyScrollable * 0.35 },
    { label: '04-story-55', y: metrics.storyTop + metrics.storyScrollable * 0.55 },
    { label: '05-story-72', y: metrics.storyTop + metrics.storyScrollable * 0.72 },
    { label: '06-story-88', y: metrics.storyTop + metrics.storyScrollable * 0.88 },
    { label: '07-story-97', y: metrics.storyTop + metrics.storyScrollable * 0.97 },
    { label: '08-menu', y: metrics.menuTop },
  ]

  for (const position of positions) {
    await page.evaluate((scrollY) => window.scrollTo({ top: scrollY, behavior: 'instant' }), position.y)
    await page.waitForTimeout(550)
    await page.screenshot({
      path: path.join(viewportDir, `${position.label}.png`),
      fullPage: false,
      animations: 'disabled',
    })
  }

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await page.waitForTimeout(250)

  const maxScroll = Math.max(metrics.documentHeight - metrics.viewportHeight, 1)
  const steps = video ? 220 : 90
  for (let index = 0; index <= steps; index += 1) {
    const y = (maxScroll * index) / steps
    await page.evaluate((scrollY) => window.scrollTo({ top: scrollY, behavior: 'instant' }), y)
    await page.waitForTimeout(video ? 28 : 8)
  }

  const screenshotPath = path.join(viewportDir, '09-full-page.png')
  await page.screenshot({ path: screenshotPath, fullPage: true, animations: 'disabled' })

  report.viewports.push({ name, width, height, mobile, metrics, positions })

  await page.close()
  await context.close()
}

try {
  await captureViewport({ name: 'mobile-412x915', width: 412, height: 915, mobile: true, video: true })
  await captureViewport({ name: 'mobile-360x800', width: 360, height: 800, mobile: true, video: false })
  await captureViewport({ name: 'desktop-1440x1000', width: 1440, height: 1000, mobile: false, video: false })
} finally {
  await browser.close()
}

fs.writeFileSync(path.join(outputRoot, 'report.json'), JSON.stringify(report, null, 2))

if (report.pageErrors.length > 0) {
  console.error('Visual audit detected page errors:', report.pageErrors)
  process.exitCode = 1
}
