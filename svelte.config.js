import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import cloudflare from '@sveltejs/adapter-cloudflare'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	preprocess: [
		mdsvex(mdsvexConfig),
		preprocess({
			postcss: true,
			preserve: ['ld+json']
		})
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
			[`app/*`]: 'src/app/*',
			[`sveltuse`]: 'src/lib',
			[`sveltuse/*`]: 'src/lib/*',
			[`components/*`]: 'src/components/*'
		}
	}
}

export default config
