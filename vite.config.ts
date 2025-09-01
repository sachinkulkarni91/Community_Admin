import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'

dotenv.config()  // Load environment variables
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    proxy: {
      '/auth': {
        target: process.env.VITE_API_URL || 'http://localhost:3009',
        changeOrigin: true,
      },
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:3009',
        changeOrigin: true,
      },
    },
  },
})
