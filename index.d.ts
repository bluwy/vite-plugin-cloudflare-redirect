import type { Plugin } from 'vite'

export interface Options {
  /**
   * The _redirects file to read. Defaults to _redirects in `publicDir` if exists,
   * else the plugin would not run any redirects.
   */
  redirectsFile?: string
}

export declare function cloudflareRedirect(options?: Options): Plugin
