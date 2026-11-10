import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Relative base for universal compatibility (GitHub Pages, Netlify, custom domains)
  server: {
    port: 5173,
    host: true
  }
})
