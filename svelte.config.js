import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
// import vercel from '@sveltejs/adapter-vercel'
import cloudflare from '@sveltejs/adapter-cloudflare'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	preprocess: [
		preprocess({
			postcss: true
		}),
		mdsvex(mdsvexConfig)
	],
	vitePlugin: {
		inspector: {
			holdMode: true
		}
	},
	kit: {
		// adapter: vercel({
		// 	// runtime: 'edge'
		// }),
		adapter: cloudflare({
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		}),
		alias: {
			[`sveltuse`]: 'src/lib',
			[`sveltuse/*`]: 'src/lib/*',
			[`components/*`]: 'src/components/*'
		}
	}
}

export default config
