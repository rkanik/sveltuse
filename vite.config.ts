import { sveltekit } from '@sveltejs/kit/vite'
import examples from 'mdsvexamples/vite'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), examples],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
}

export default config
