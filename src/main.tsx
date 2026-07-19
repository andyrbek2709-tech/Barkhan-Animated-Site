import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import App from './App'
import './index.css'
import './mobile-fixes.css'
import './menu.css'
import './real-burger.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MotionConfig
      reducedMotion="user"
      transition={{ type: 'spring', stiffness: 180, damping: 24, mass: 0.9 }}
    >
      <App />
    </MotionConfig>
  </React.StrictMode>,
)
