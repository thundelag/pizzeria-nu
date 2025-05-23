import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/pizzeria-nu/' : '/',
  build: {
    assetsInlineLimit: 0, // Don't inline any assets as base64
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@assets': resolve(__dirname, './src/assets'),
    },
  },
  optimizeDeps: {
    exclude: ['@assets'],
  },
})
