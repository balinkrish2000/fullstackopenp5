import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://studious-invention-xv7qw4599jv36vg7-3001.app.github.dev/',
        changeOrigin: true,
      },
    }
  },
})
