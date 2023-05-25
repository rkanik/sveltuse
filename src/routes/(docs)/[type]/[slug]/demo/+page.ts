import { error } from '@sveltejs/kit'

export async function load({ params }) {
	const demos = []
	const possibleDemos = [...Array(100).keys()].map((i) => i + 1)

	for (const index of possibleDemos) {
		try {
			const component = await import(
				`../../../../../lib/${params.type}/${params.slug}/demo${
					index > 1 ? index : ''
				}.svelte`
			)
			demos.push(component)
		} catch (_) {
			break
		}
	}

	if (!demos.length) {
		throw error(404, {
			message: 'Page not found!'
		})
	}

	return {
		demos
	}
}
