import type { RO_Sitemap } from 'sveltekit-sitemap';

export const sitemap = (<const>{
   "/(docs)/[type]": true,
   "/(docs)/[type]/[slug]": true,
   "/(docs)/[type]/[slug]/demo": true,
   "/(docs)/[type]/[slug]/demo/[id]": false,
   "/(docs)": true,
   "/": true,
   "/landing": true
}) satisfies RO_Sitemap

export type Sitemap = typeof sitemap
