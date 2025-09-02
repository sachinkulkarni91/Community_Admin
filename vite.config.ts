import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174,
    proxy: {
      '/auth': {
        target: 'http://localhost:3009',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path,
      },
      '/api': {
        target: 'http://localhost:3009',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path,
      },
    },
  },
})
