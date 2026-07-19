import type { Transition, Variants } from 'motion/react'

export const springSmooth: Transition = {
  type: 'spring',
  stiffness: 180,
  damping: 24,
  mass: 0.9,
}

export const springImpact: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 20,
  mass: 0.75,
}

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 42 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springSmooth,
  },
}

export const revealScale: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: springSmooth,
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
}

export const viewportOnce = {
  once: true,
  amount: 0.18,
} as const
