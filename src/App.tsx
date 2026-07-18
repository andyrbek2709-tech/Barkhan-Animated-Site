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

type ProductLayer = {
  src: string
  alt: string
  y: number
  width: number
}

type MenuProduct = {
  name: string
  weight: string
  price: string
  description: string
  badge: string
  layers: ProductLayer[]
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

const menuProducts: MenuProduct[] = [
  {
    name: 'Barkhan',
    weight: '395 г',
    price: 'от 4 650 ₸',
    badge: 'Фирменный',
    description: 'Двойная котлета, чеддер, томаты, красный лук, огурцы, салат и три фирменных соуса.',
    layers: [
      { src: '/assets/burger/bun-bottom.svg', alt: 'Нижняя булочка', y: 92, width: 70 },
      { src: '/assets/burger/lettuce.svg', alt: 'Салат', y: 67, width: 76 },
      { src: '/assets/burger/patty.svg', alt: 'Котлета', y: 39, width: 72 },
      { src: '/assets/burger/cheese.svg', alt: 'Сыр', y: 13, width: 76 },
      { src: '/assets/burger/pickles.svg', alt: 'Огурцы', y: -9, width: 62 },
      { src: '/assets/burger/tomato.svg', alt: 'Томаты', y: -31, width: 69 },
      { src: '/assets/burger/onion.svg', alt: 'Красный лук', y: -50, width: 64 },
      { src: '/assets/burger/bun-top.svg', alt: 'Верхняя булочка', y: -112, width: 73 },
    ],
  },
  {
    name: 'Smash Классик',
    weight: '330 г',
    price: 'от 3 650 ₸',
    badge: 'Хит',
    description: 'Двойная smash-котлета, тройной чеддер, огурцы, жареный лук и пикантные соусы.',
    layers: [
      { src: '/assets/burger/bun-bottom.svg', alt: 'Нижняя булочка', y: 94, width: 70 },
      { src: '/assets/burger/patty.svg', alt: 'Первая котлета', y: 61, width: 73 },
      { src: '/assets/burger/cheese.svg', alt: 'Первый слой сыра', y: 36, width: 76 },
      { src: '/assets/burger/patty.svg', alt: 'Вторая котлета', y: 8, width: 73 },
      { src: '/assets/burger/cheese.svg', alt: 'Второй слой сыра', y: -17, width: 76 },
      { src: '/assets/burger/pickles.svg', alt: 'Огурцы', y: -39, width: 61 },
      { src: '/assets/burger/onion.svg', alt: 'Лук', y: -55, width: 60 },
      { src: '/assets/burger/bun-top.svg', alt: 'Верхняя булочка', y: -116, width: 73 },
    ],
  },
  {
    name: 'Chick',
    weight: '280 г',
    price: 'от 2 750 ₸',
    badge: 'Легче',
    description: 'Куриная грудка, чеддер, свежие томаты, огурцы, салат и соусы Айоли и 1000 островов.',
    layers: [
      { src: '/assets/burger/bun-bottom.svg', alt: 'Нижняя булочка', y: 93, width: 70 },
      { src: '/assets/burger/lettuce.svg', alt: 'Салат', y: 67, width: 76 },
      { src: '/assets/burger/patty.svg', alt: 'Куриная грудка', y: 34, width: 71 },
      { src: '/assets/burger/cheese.svg', alt: 'Сыр', y: 9, width: 75 },
      { src: '/assets/burger/pickles.svg', alt: 'Огурцы', y: -15, width: 61 },
      { src: '/assets/burger/tomato.svg', alt: 'Томаты', y: -38, width: 68 },
      { src: '/assets/burger/bun-top.svg', alt: 'Верхняя булочка', y: -105, width: 73 },
    ],
  },
]

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))

function ProductBurger({ product }: { product: MenuProduct }) {
  return (
    <div className="product-burger" aria-hidden="true">
      <div className="product-glow" />
      {product.layers.map((layer, index) => (
        <img
          key={`${product.name}-${layer.alt}-${index}`}
          src={layer.src}
          alt=""
          style={{
            width: `${layer.width}%`,
            transform: `translate3d(-50%, ${layer.y}px, 0)`,
            zIndex: index + 2,
          }}
          draggable={false}
        />
      ))}
    </div>
  )
}

export default function App() {
  const storyRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === 'undefined' ? 1280 : window.innerWidth,
  )

  useEffect(() => {
    let frame = 0

    const update = () => {
      const section = storyRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const scrollable = section.offsetHeight - window.innerHeight
      setProgress(clamp(-rect.top / Math.max(scrollable, 1)))
      setViewportWidth(window.innerWidth)
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

  const isMobile = viewportWidth <= 640
  const isTablet = viewportWidth > 640 && viewportWidth <= 900
  const sceneRatio = isMobile ? 0.72 : isTablet ? 0.86 : 1
  const finalLift = orderProgress * (isMobile ? -125 : isTablet ? -80 : -40)
  const packedDrop = boxProgress * (isMobile ? 54 : isTablet ? 72 : 92)

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Barkhan Burger Shop — на главную">
          <img src="/assets/barkhan-mark.svg" alt="" />
          <span>BARKHAN</span>
        </a>
        <a className="header-order" href="https://barkhanburgershop.com/aktau" target="_blank" rel="noreferrer">Заказать</a>
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
              transform: `translate3d(0, calc(-50% - ${copyProgress * 55}px), 0)`,
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
              const entryY = (-430 - index * 28) * sceneRatio
              const finalY = layer.finalY * sceneRatio
              const y = entryY + (finalY - entryY) * layerProgress
              const x = layer.startX * sceneRatio * (1 - layerProgress)
              const rotate = layer.rotate * (1 - layerProgress)
              const scale = 0.7 + layerProgress * 0.3
              const packedScale = 1 - boxProgress * 0.13

              const style: CSSProperties = {
                width: `${layer.width * sceneRatio}px`,
                opacity: clamp(layerProgress * 1.8),
                transform: `translate3d(calc(-50% + ${x}px), ${y + packedDrop + finalLift}px, 0) rotate(${rotate}deg) scale(${scale * packedScale})`,
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
                transform: `translate3d(-50%, ${178 - boxProgress * 128 + finalLift}px, 0) scale(${0.82 + boxProgress * 0.18})`,
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
            <a href="https://barkhanburgershop.com/aktau" target="_blank" rel="noreferrer">Заказать сейчас</a>
          </div>

          <div className="progress-rail" aria-hidden="true">
            <span style={{ transform: `scaleY(${progress})` }} />
          </div>
        </div>
      </section>

      <section className="menu-showcase" id="menu">
        <div className="menu-intro">
          <div>
            <span className="section-kicker">Меню Barkhan · Актау</span>
            <h2>Выберите<br />своего</h2>
          </div>
          <p>Три характера — один фирменный подход. Сочные ингредиенты, горячая подача и насыщенный вкус.</p>
        </div>

        <div className="product-grid">
          {menuProducts.map((product, index) => (
            <article className={`product-card product-card-${index + 1}`} key={product.name}>
              <div className="product-topline">
                <span>{product.badge}</span>
                <span>{product.weight}</span>
              </div>
              <ProductBurger product={product} />
              <div className="product-copy">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-action">
                  <strong>{product.price}</strong>
                  <a href="https://barkhanburgershop.com/aktau" target="_blank" rel="noreferrer" aria-label={`Заказать ${product.name}`}>↗</a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="menu-footer">
          <div>
            <span>Ежедневно</span>
            <strong>11:00 — 23:00</strong>
          </div>
          <div>
            <span>Адрес</span>
            <strong>4-й микрорайон, 84/1</strong>
          </div>
          <a href="https://barkhanburgershop.com/aktau" target="_blank" rel="noreferrer">Открыть всё меню</a>
        </div>
      </section>
    </main>
  )
}
