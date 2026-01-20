import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    middlewares: [
      {
        id: 'skillhub-proxy',
        apply: 'serve',
        enforce: 'pre',
        handle(req, res, next) {
          // Proxy /data requests to public folder
          if (req.url?.startsWith('/data/')) {
            const path = req.url.replace('/data/', '')
            req.url = `/${path}`
          }
          next()
        }
      }
    ]
  }
})
