import type Mdsvex from '*.md'
import type { Post } from 'app/types'

type Markdowns = Record<string, () => Promise<Mdsvex>>

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
	return {
		postGroups: [
			{
				label: 'Guide',
				items: await getPostsFromMarkdowns(
					import.meta.glob<Mdsvex>('/src/md/guide/*.md')
				)
			},
			{
				label: 'Core Functions',
				items: await getPostsFromMarkdowns(
					import.meta.glob<Mdsvex>('/src/lib/core/*/*.md')
				)
			},
			{
				label: 'Integrations',
				items: await getPostsFromMarkdowns(
					import.meta.glob<Mdsvex>('/src/lib/integrations/*/*.md')
				)
			}
		]
	}
}
