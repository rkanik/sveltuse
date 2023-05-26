import { defineConfig, loadEnv } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { sitemapPlugin } from 'sveltekit-sitemap/dist/plugin'

import examples from 'mdsvexamples/vite'

export default ({ mode }: any) => {
	process.env = {
		...process.env,
		...loadEnv(mode, process.cwd())
	}

	const plugins = [sveltekit(), examples]
	if (process.env.NODE_ENV === 'production') {
		plugins.push(sitemapPlugin())
	}

	return defineConfig({
		plugins,
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}']
		}
	})
}
