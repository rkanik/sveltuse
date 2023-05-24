export async function load({ params }) {
	const post = await import(`./${params.type}.md`)

	const { title, dir } = post.metadata
	const content = post.default
	return {
		content,
		title,
		dir
	}
}
