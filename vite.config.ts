import { sveltekit } from '@sveltejs/kit/vite'
import { sitemapPlugin } from 'sveltekit-sitemap/dist/plugin'

import examples from 'mdsvexamples/vite'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), sitemapPlugin(), examples],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
}

export default config
