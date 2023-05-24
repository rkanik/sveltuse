export async function load({ params }) {
	const post = await import(
		`../../../../lib/${params.type}/${params.slug}/index.md`
	)

	const { title, dir } = post.metadata
	const content = post.default
	return {
		content,
		title,
		dir
	}
}
