import { defineConfig } from 'vite'
import { cloudflareRedirect } from 'vite-plugin-cloudflare-redirect'

export default defineConfig({
  plugins: [cloudflareRedirect()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        nested: 'nested.html'
      }
    }
  }
})
