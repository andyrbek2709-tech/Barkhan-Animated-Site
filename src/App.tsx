import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

type BurgerLayer = {
  id: string
  name: string
  src: string
  finalY: number
  start: number
  startX: number
  rotate: number
  width: number
}

const layers: BurgerLayer[] = [
  { id: 'bottom', name: 'Нижняя булочка', src: '/assets/burger/bun-bottom.svg', finalY: 185, start: 0.08, startX: -260, rotate: -12, width: 390 },
  { id: 'sauce', name: 'Фирменный соус', src: '/assets/burger/sauce.svg', finalY: 143, start: 0.15, startX: 255, rotate: 8, width: 410 },
  { id: 'lettuce', name: 'Свежий салат', src: '/assets/burger/lettuce.svg', finalY: 112, start: 0.22, startX: -270, rotate: -9, width: 430 },
  { id: 'patty', name: 'Мясная котлета', src: '/assets/burger/patty.svg', finalY: 70, start: 0.30, startX: 280, rotate: 10, width: 410 },
  { id: 'cheese', name: 'Сыр', src: '/assets/burger/cheese.svg', finalY: 26, start: 0.38, startX: -285, rotate: -8, width: 430 },
  { id: 'pickles', name: 'Маринованные огурцы', src: '/assets/burger/pickles.svg', finalY: -10, start: 0.46, startX: 255, rotate: 11, width: 370 },
  { id: 'tomato', name: 'Томаты', src: '/assets/burger/tomato.svg', finalY: -42, start: 0.54, startX: -260, rotate: -9, width: 390 },
  { id: 'onion', name: 'Красный лук', src: '/assets/burger/onion.svg', finalY: -76, start: 0.61, startX: 250, rotate: 11, width: 370 },
  { id: 'top', name: 'Верхняя булочка', src: '/assets/burger/bun-top.svg', finalY: -177, start: 0.69, startX: 0, rotate: -5, width: 410 },
]

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))

export default function App() {
  const storyRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const update = () => {
      const section = storyRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const scrollable = section.offsetHeight - window.innerHeight
      setProgress(clamp(-rect.top / Math.max(scrollable, 1)))
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const copyProgress = clamp(progress / 0.18)
  const boxProgress = clamp((progress - 0.80) / 0.11)
  const lidProgress = clamp((progress - 0.89) / 0.065)
  const orderProgress = clamp((progress - 0.94) / 0.06)

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Barkhan Burger Shop — на главную">
          <img src="/assets/barkhan-mark.svg" alt="" />
          <span>BARKHAN</span>
        </a>
        <a className="header-order" href="#order">Заказать</a>
      </header>

      <section className="burger-story" ref={storyRef} id="top">
        <div className="sticky-stage">
          <div className="ambient ambient-one" />
          <div className="ambient ambient-two" />
          <div className="grain" />

          <div
            className="hero-copy"
            style={{
              opacity: 1 - copyProgress,
              transform: `translate3d(0, ${copyProgress * -55}px, 0)`,
            }}
          >
            <span className="kicker">BARKHAN BURGER SHOP · AKTAU</span>
            <h1>Собираем вкус<br />по слоям</h1>
            <p>Листайте вниз — фирменный Barkhan соберётся и упакуется прямо перед вами.</p>
            <span className="scroll-hint"><i /> Листайте</span>
          </div>

          <div className="burger-scene" aria-label="Анимированная сборка фирменного бургера Barkhan">
            <div className="burger-glow" />

            {layers.map((layer, index) => {
              const layerProgress = clamp((progress - layer.start) / 0.105)
              const entryY = -430 - index * 28
              const y = entryY + (layer.finalY - entryY) * layerProgress
              const x = layer.startX * (1 - layerProgress)
              const rotate = layer.rotate * (1 - layerProgress)
              const scale = 0.7 + layerProgress * 0.3
              const packedScale = 1 - boxProgress * 0.13
              const packedY = boxProgress * 92

              const style: CSSProperties = {
                width: `${layer.width}px`,
                opacity: clamp(layerProgress * 1.8),
                transform: `translate3d(calc(-50% + ${x}px), ${y + packedY}px, 0) rotate(${rotate}deg) scale(${scale * packedScale})`,
                zIndex: 20 + index,
              }

              return (
                <img
                  key={layer.id}
                  className="burger-layer"
                  src={layer.src}
                  alt={layer.name}
                  style={style}
                  draggable={false}
                />
              )
            })}

            <div
              className="burger-box"
              style={{
                opacity: boxProgress,
                transform: `translate3d(-50%, ${178 - boxProgress * 128}px, 0) scale(${0.82 + boxProgress * 0.18})`,
              }}
            >
              <div
                className="box-lid"
                style={{ transform: `rotateX(${70 - lidProgress * 70}deg)` }}
              >
                <img src="/assets/barkhan-mark.svg" alt="" />
                <span>BARKHAN</span>
              </div>
              <div className="box-base"><span>FRESH · HOT · LOCAL</span></div>
            </div>
          </div>

          <div className="step-labels" aria-hidden="true">
            <span className={progress > 0.08 ? 'active' : ''}>01 · ОСНОВА</span>
            <span className={progress > 0.35 ? 'active' : ''}>02 · СОЧНОСТЬ</span>
            <span className={progress > 0.68 ? 'active' : ''}>03 · ГОТОВО</span>
          </div>

          <div
            className="order-reveal"
            id="order"
            style={{
              opacity: orderProgress,
              transform: `translate3d(-50%, ${32 - orderProgress * 32}px, 0)`,
              pointerEvents: orderProgress > 0.8 ? 'auto' : 'none',
            }}
          >
            <span>Ваш Barkhan готов</span>
            <h2>Горячий. Сочный. Ваш.</h2>
            <a href="https://www.instagram.com/barkhan_aktau" target="_blank" rel="noreferrer">Заказать сейчас</a>
          </div>

          <div className="progress-rail" aria-hidden="true">
            <span style={{ transform: `scaleY(${progress})` }} />
          </div>
        </div>
      </section>

      <section className="after-hero">
        <span>Продолжение сайта</span>
        <h2>Меню, доставка и любимые позиции Barkhan</h2>
        <p>Дальше появятся карточки бургеров, комбо-наборы, адреса точек и быстрый переход к заказу.</p>
      </section>
    </main>
  )
}
