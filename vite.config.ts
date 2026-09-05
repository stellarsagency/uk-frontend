import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { defineConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/uk-frontend/',
  resolve: {
    alias: {
      '@': `${__dirname}/src`,
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
})
