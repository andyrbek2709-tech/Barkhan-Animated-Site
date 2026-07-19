import { useEffect, useRef, useState } from 'react'
import { masterBurger } from './assets/master-burger'

const ORDER_URL = 'https://barkhanburgershop.com/aktau'

const products = [
  {
    name: 'Barkhan',
    label: 'Фирменный',
    weight: '395 г',
    price: 'от 4 650 ₸',
    description: 'Двойная котлета, чеддер, томаты, красный лук, огурцы, салат и фирменные соусы.',
  },
  {
    name: 'Smash Классик',
    label: 'Хит',
    weight: '330 г',
    price: 'от 3 650 ₸',
    description: 'Двойная smash-котлета, чеддер, огурцы, жареный лук и пикантные соусы.',
  },
  {
    name: 'Chick',
    label: 'Легче',
    weight: '280 г',
    price: 'от 2 750 ₸',
    description: 'Куриная грудка, чеддер, свежие томаты, огурцы, салат и соусы.',
  },
]

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))

export default function App() {
  const heroRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const update = () => {
      const hero = heroRef.current
      if (!hero) return

      const rect = hero.getBoundingClientRect()
      const distance = Math.max(hero.offsetHeight - window.innerHeight, 1)
      setProgress(clamp(-rect.top / distance))
    }

    const requestUpdate = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  const introFade = clamp((progress - 0.08) / 0.38)
  const detailReveal = clamp((progress - 0.48) / 0.28)
  const burgerScale = 0.9 + progress * 0.18
  const burgerY = 38 - progress * 62

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="topbar-brand" href="#top" aria-label="Barkhan — начало страницы">
          <img src="/assets/barkhan-mark.svg" alt="" />
          <span>BARKHAN</span>
        </a>
        <a className="topbar-order" href={ORDER_URL} target="_blank" rel="noreferrer">
          Заказать
        </a>
      </header>

      <section className="hero" ref={heroRef} id="top">
        <div className="hero-sticky">
          <div className="hero-light" aria-hidden="true" />
          <div className="hero-noise" aria-hidden="true" />

          <div
            className="hero-copy"
            style={{
              opacity: 1 - introFade,
              transform: `translate3d(0, ${-introFade * 36}px, 0)`,
              pointerEvents: introFade > 0.8 ? 'none' : 'auto',
            }}
          >
            <span className="eyebrow">BARKHAN BURGER SHOP · АКТАУ</span>
            <h1>
              Горячий.<br />
              Сочный.<br />
              <em>Barkhan.</em>
            </h1>
            <p>Один цельный вкус. Без визуальных фокусов — только бургер, который хочется заказать.</p>
            <div className="hero-actions">
              <a className="button button-primary" href={ORDER_URL} target="_blank" rel="noreferrer">
                Заказать сейчас
              </a>
              <a className="button button-secondary" href="#menu">
                Смотреть меню
              </a>
            </div>
          </div>

          <div className="hero-product" aria-label="Фирменный бургер Barkhan">
            <div
              className="burger-aura"
              style={{ opacity: 0.58 + progress * 0.28, transform: `translate(-50%, -50%) scale(${0.92 + progress * 0.16})` }}
            />
            <img
              className="master-burger"
              src={masterBurger}
              alt="Фирменный бургер Barkhan"
              fetchPriority="high"
              decoding="async"
              draggable={false}
              style={{ transform: `translate3d(-50%, ${burgerY}px, 0) scale(${burgerScale})` }}
            />
            <div
              className="burger-shadow"
              style={{ opacity: 0.35 + progress * 0.2, transform: `translateX(-50%) scale(${0.88 + progress * 0.14})` }}
            />
          </div>

          <div
            className="hero-detail"
            style={{
              opacity: detailReveal,
              transform: `translate3d(0, ${28 - detailReveal * 28}px, 0)`,
              pointerEvents: detailReveal > 0.75 ? 'auto' : 'none',
            }}
          >
            <span>Фирменный Barkhan</span>
            <strong>395 г</strong>
            <p>Двойная котлета · чеддер · свежие овощи · фирменные соусы</p>
            <div>
              <b>от 4 650 ₸</b>
              <a href={ORDER_URL} target="_blank" rel="noreferrer">Заказать ↗</a>
            </div>
          </div>

          <div className="scroll-cue" style={{ opacity: 1 - clamp(progress / 0.2) }} aria-hidden="true">
            <i /> Листайте
          </div>
        </div>
      </section>

      <section className="menu-section" id="menu">
        <div className="menu-heading">
          <div>
            <span className="eyebrow">МЕНЮ · АКТАУ</span>
            <h2>Выберите<br />свой вкус</h2>
          </div>
          <p>Без искусственных мини-бургеров и декоративного шума. Только состав, вес и цена.</p>
        </div>

        <div className="menu-layout">
          <div className="menu-visual" aria-hidden="true">
            <div className="menu-visual-glow" />
            <img src={masterBurger} alt="" loading="lazy" decoding="async" draggable={false} />
          </div>

          <div className="product-list">
            {products.map((product, index) => (
              <article className="product-row" key={product.name}>
                <div className="product-index">0{index + 1}</div>
                <div className="product-main">
                  <div className="product-titleline">
                    <h3>{product.name}</h3>
                    <span>{product.label}</span>
                  </div>
                  <p>{product.description}</p>
                  <div className="product-meta">
                    <span>{product.weight}</span>
                    <strong>{product.price}</strong>
                  </div>
                </div>
                <a href={ORDER_URL} target="_blank" rel="noreferrer" aria-label={`Заказать ${product.name}`}>
                  ↗
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <span>Ежедневно</span>
          <strong>11:00 — 23:00</strong>
        </div>
        <div>
          <span>Адрес</span>
          <strong>4-й микрорайон, 84/1</strong>
        </div>
        <a href={ORDER_URL} target="_blank" rel="noreferrer">Открыть полное меню ↗</a>
      </footer>
    </main>
  )
}
