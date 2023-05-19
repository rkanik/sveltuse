import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
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
		adapter: cloudflare({
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		}),
		alias: {
			'@shared': 'src/lib/shared',
			'@shared/*': 'src/lib/shared/*',
			'sveluse/integrations/*': 'src/lib/integrations/*'
		}
	}
}

export default config
