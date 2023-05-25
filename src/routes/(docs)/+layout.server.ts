import type Mdsvex from '*.md'
import getPostsFromMarkdowns from 'app/utils/getPostsFromMarkdowns'

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
