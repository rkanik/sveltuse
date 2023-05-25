import type Mdsvex from '*.md'
import getPostsFromMarkdowns from '../getPostsFromMarkdowns'

const getPosts = async () => {
	return (
		await Promise.all([
			await getPostsFromMarkdowns(
				import.meta.glob<Mdsvex>('/src/md/guide/*.md')
			),
			await getPostsFromMarkdowns(
				import.meta.glob<Mdsvex>('/src/lib/core/*/*.md')
			),
			await getPostsFromMarkdowns(
				import.meta.glob<Mdsvex>('/src/lib/integrations/*/*.md')
			)
		])
	).reduce((posts, v) => posts.concat(v), [])
}

export default getPosts
