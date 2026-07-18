import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const railwayHosts = [
  'barkhan-animated-site-production.up.railway.app',
  '.up.railway.app',
]

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: railwayHosts,
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: railwayHosts,
  },
})
