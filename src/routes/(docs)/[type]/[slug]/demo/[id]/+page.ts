import { error } from '@sveltejs/kit'

export async function load({ params }) {
	try {
		const component = await import(
			`../../../../../../lib/${params.type}/${params.slug}/demo${
				+params.id > 1 ? params.id : ''
			}.svelte`
		)
		return {
			component: component.default
		}
	} catch (_) {
		throw error(404, {
			message: 'Page not found!'
		})
	}
}
