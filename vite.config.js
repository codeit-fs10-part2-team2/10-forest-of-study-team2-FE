import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'https://one0-forest-of-study-team2-be.onrender.com',
        changeOrigin: true,
      },

      '/health': {
        target: 'https://one0-forest-of-study-team2-be.onrender.com',
        changeOrigin: true,
      }
    },
  }
})

