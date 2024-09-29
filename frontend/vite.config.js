import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import vue from '@vitejs/plugin-vue'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: process.env.VITE_API_PORT || 8081,
    host: '0.0.0.0',  // This will allow external access to the server
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
