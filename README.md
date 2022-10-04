# vite-plugin-cloudflare-redirect

Vite plugin to handle Cloudflare's \_redirects file following https://developers.cloudflare.com/pages/platform/redirects/.

## Usage

Create a `_redirects` file at `/public` (or following the `publicDir` config):

```ini
# /public/_redirects
/foo https://example.com 302
```

```js
// vite.config.js
import { defineConfig } from 'vite'
import { cloudflareRedirect } from 'vite-plugin-cloudflare-redirect'

export default defineConfig({
  plugins: [
    cloudflareRedirect({
      redirectsFile: './custom/_redirects' // optional
    })
  ]
})
```

By default if no options are passed, the plugin would try to load from `/public/_redirects` (from `publicDir` config). If the file isn't found, no redirects will happen. Pass the `redirectsFile` option to specify a custom path.

## Sponsors

<p align="center">
  <a href="https://bjornlu.com/sponsors.svg">
    <img src="https://bjornlu.com/sponsors.svg" alt="Sponsors" />
  </a>
</p>

## License

MIT
