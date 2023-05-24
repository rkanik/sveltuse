import type Mdsvex from '*.md'

type Markdowns = Record<string, () => Promise<Mdsvex>>

type Post = {
	id: number
	href: string
	hrefText: string | null

	title: string
	description: string | null
}

const getPostsFromMarkdowns = async (markdowns: Markdowns) => {
	return (
		await Promise.all(
			Object.values(markdowns).map(async (resolver, index) => {
				const { metadata } = await resolver()
				return {
					id: +(metadata.id || index),
					href: metadata.href,
					hrefText: metadata.hrefText,
					title: metadata.title,
					description: metadata.description
				} as Post
			})
		)
	).sort((a, b) => a.id - b.id) as unknown as Promise<Post[]>
}

export async function load() {
	const guides = await getPostsFromMarkdowns(
		import.meta.glob<Mdsvex>('./[type]/*.md')
	)

	const cores = await getPostsFromMarkdowns(
		import.meta.glob<Mdsvex>('/src/lib/core/*/*.md')
	)

	return {
		groups: [
			{
				label: 'Guide',
				items: guides
			},
			{
				label: 'Core Functions',
				items: cores
			}
		]
	}
}
