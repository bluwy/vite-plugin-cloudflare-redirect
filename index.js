import fs from 'node:fs/promises'
import path from 'node:path'
import { createRedirect } from 'cloudflare-redirect-parser'

/** @type {import('./index').cloudflareRedirect} */
export function cloudflareRedirect(options) {
  /** @type {import('vite').ViteDevServer['middlewares']['handle']} */
  let middleware
  return {
    name: 'vite-plugin-cloudflare-redirect',
    apply: 'serve',
    async configResolved(config) {
      /** @type {string} */
      let content
      if (options?.redirectsFile) {
        content = await fs.readFile(
          path.resolve(options.redirectsFile),
          'utf-8'
        )
      } else {
        try {
          content = await fs.readFile(
            path.resolve(config.publicDir, '_redirects'),
            'utf-8'
          )
        } catch {}
      }
      if (content) {
        const redirect = createRedirect(content)
        middleware = (req, res, next) => {
          if (req.url) {
            const redirected = redirect(req.url)
            if (redirected) {
              res.writeHead(redirected.status, { location: redirected.to })
              res.end()
              return
            }
          }
          next()
        }
      }
    },
    configureServer(server) {
      if (middleware) {
        server.middlewares.use(middleware)
      }
    },
    configurePreviewServer(server) {
      if (middleware) {
        server.middlewares.use(middleware)
      }
    }
  }
}
