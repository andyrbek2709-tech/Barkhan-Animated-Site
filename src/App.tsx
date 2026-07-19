import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { burgerReal } from './assets/burger-real'

const springSmooth = { type: 'spring', stiffness: 170, damping: 24, mass: 0.9 } as const

const revealUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: springSmooth },
}

const revealScale: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 26 },
  visible: { opacity: 1, scale: 1, y: 0, transition: springSmooth },
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
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

const ORDER_URL = 'https://barkhanburgershop.com/aktau'

const menuProducts: MenuProduct[] = [
  {
    name: 'Barkhan',
    weight: '395 г',
    price: 'от 4 650 ₸',
    badge: 'Фирменный',
    description: 'Двойная котлета, чеддер, томаты, красный лук, огурцы, салат и три фирменных соуса.',
    layers: [
      { src: burgerReal.bottom, alt: 'Нижняя булочка', y: 91, width: 72 },
      { src: burgerReal.sauce, alt: 'Соус', y: 70, width: 72 },
      { src: burgerReal.lettuce, alt: 'Салат', y: 49, width: 78 },
      { src: burgerReal.patty, alt: 'Котлета', y: 18, width: 73 },
      { src: burgerReal.cheese, alt: 'Сыр', y: -7, width: 77 },
      { src: burgerReal.pickles, alt: 'Огурцы', y: -28, width: 64 },
      { src: burgerReal.tomato, alt: 'Томаты', y: -48, width: 70 },
      { src: burgerReal.onion, alt: 'Красный лук', y: -65, width: 65 },
      { src: burgerReal.top, alt: 'Верхняя булочка', y: -119, width: 74 },
    ],
  },
  {
    name: 'Smash Классик',
    weight: '330 г',
    price: 'от 3 650 ₸',
    badge: 'Хит',
    description: 'Двойная smash-котлета, тройной чеддер, огурцы, жареный лук и пикантные соусы.',
    layers: [
      { src: burgerReal.bottom, alt: 'Нижняя булочка', y: 99, width: 72 },
      { src: burgerReal.sauce, alt: 'Соус', y: 77, width: 70 },
      { src: burgerReal.patty, alt: 'Первая котлета', y: 48, width: 73 },
      { src: burgerReal.cheese, alt: 'Первый слой сыра', y: 25, width: 76 },
      { src: burgerReal.patty, alt: 'Вторая котлета', y: -5, width: 73 },
      { src: burgerReal.cheese, alt: 'Второй слой сыра', y: -29, width: 76 },
      { src: burgerReal.pickles, alt: 'Огурцы', y: -49, width: 63 },
      { src: burgerReal.onion, alt: 'Лук', y: -65, width: 62 },
      { src: burgerReal.top, alt: 'Верхняя булочка', y: -120, width: 74 },
    ],
  },
  {
    name: 'Chick',
    weight: '280 г',
    price: 'от 2 750 ₸',
    badge: 'Легче',
    description: 'Куриная грудка, чеддер, свежие томаты, огурцы, салат и соусы Айоли и 1000 островов.',
    layers: [
      { src: burgerReal.bottom, alt: 'Нижняя булочка', y: 92, width: 72 },
      { src: burgerReal.sauce, alt: 'Соус', y: 70, width: 70 },
      { src: burgerReal.lettuce, alt: 'Салат', y: 48, width: 78 },
      { src: burgerReal.patty, alt: 'Куриная грудка', y: 16, width: 72 },
      { src: burgerReal.cheese, alt: 'Сыр', y: -8, width: 76 },
      { src: burgerReal.pickles, alt: 'Огурцы', y: -29, width: 63 },
      { src: burgerReal.tomato, alt: 'Томаты', y: -49, width: 69 },
      { src: burgerReal.top, alt: 'Верхняя булочка', y: -112, width: 74 },
    ],
  },
]

function BurgerStack({ layers, className }: { layers: ProductLayer[]; className?: string }) {
  return (
    <div className={className ?? 'product-burger'} aria-hidden="true">
      <div className="product-glow" />
      {layers.map((layer, index) => (
        <img
          key={`${className ?? 'p'}-${layer.alt}-${index}`}
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
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Barkhan Burger Shop — на главную">
          <img src="/assets/barkhan-mark.svg" alt="" />
          <span>BARKHAN</span>
        </a>
        <a className="header-order" href={ORDER_URL} target="_blank" rel="noreferrer">Заказать</a>
      </header>

      <motion.section
        className="hero"
        id="top"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-glow" />
          <div className="hero-dune" />
          <div className="grain" />
        </div>

        <div className="hero-inner">
          <motion.div className="hero-text" variants={revealUp}>
            <span className="kicker">BARKHAN BURGER SHOP · АКТАУ</span>
            <h1>Собран на огне.<br />Подан горячим.</h1>
            <p>
              Крафтовые бургеры в Актау — сочная котлета на живом огне, свежая
              булочка каждый день и три фирменных соуса.
            </p>
            <div className="hero-cta">
              <a className="btn-primary" href={ORDER_URL} target="_blank" rel="noreferrer">
                Заказать
              </a>
              <a className="btn-ghost" href="#menu">Смотреть меню</a>
            </div>
          </motion.div>

          <motion.div className="hero-visual" variants={revealScale}>
            <div className="hero-visual-glow" />
            <img
              className="hero-burger-img"
              src="/assets/burger-whole.webp"
              alt="Фирменный бургер Barkhan"
              draggable={false}
            />
          </motion.div>
        </div>
      </motion.section>

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
            <motion.article
              className={`product-card product-card-${index + 1}`}
              key={product.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={revealUp}
            >
              <div className="product-topline">
                <span>{product.badge}</span>
                <span>{product.weight}</span>
              </div>
              <BurgerStack layers={product.layers} />
              <div className="product-copy">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-action">
                  <strong>{product.price}</strong>
                  <a href={ORDER_URL} target="_blank" rel="noreferrer" aria-label={`Заказать ${product.name}`}>↗</a>
                </div>
              </div>
            </motion.article>
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
          <a href={ORDER_URL} target="_blank" rel="noreferrer">Открыть всё меню</a>
        </div>
      </section>
    </main>
  )
}
