/// <reference types="unlighthouse" />
import { defineConfig } from 'unlighthouse'

export default defineConfig({
	site: 'https://sveltuse.pages.dev/',
	scanner: {
		exclude: [],
		samples: 3,
		throttle: true,
		device: 'desktop'
	},
	debug: true
})
