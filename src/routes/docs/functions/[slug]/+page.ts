export async function load({ params }) {
	let post

	try {
		post = await import(`../../../../lib/core/${params.slug}/index.md`)
	} catch (_) {
		try {
			post = await import(`../${params.slug}.md`)
		} catch (_) {}
	}

	const { title, dir } = post.metadata
	const content = post.default
	return {
		content,
		title,
		dir
	}
}
