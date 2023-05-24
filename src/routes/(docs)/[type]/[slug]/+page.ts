import { error } from '@sveltejs/kit'

export async function load({ params }) {
	try {
		const post = await import(
			`../../../../lib/${params.type}/${params.slug}/index.md`
		)
		return {
			content: post.default
		}
	} catch (err: any) {
		throw error(404, {
			message: err.message || 'Page not found!'
		})
	}
}
