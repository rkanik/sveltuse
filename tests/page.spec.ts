import { expect, test } from '@playwright/test'

test('index page should have h1', async ({ page }) => {
	await page.goto('/')

	expect(await page.textContent('h1')).toBe(
		'Sveltuse  Collection of Svelte Composition Utilities'
	)
})
