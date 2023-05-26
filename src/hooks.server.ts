import type Mdsvex from '*.md'
import getPostsFromMarkdowns from 'app/utils/getPostsFromMarkdowns'

import { sitemap } from './sitemap'
import { sitemapHook, type RouteDefinition } from 'sveltekit-sitemap'
import type { Post } from 'app/types'

const redirects: Record<string, string> = {
	[`/core`]: '/core/useCounter',
	[`/integrations`]: '/integrations/usePDF'
}

const postMapper = (post: Post): RouteDefinition<false> => ({
	path: post.href,
	priority: '0.7'
})

export const handle = async (input) => {
	const redirectPathname = redirects[input.event.url.pathname]
	if (redirectPathname) {
		return Response.redirect(redirectPathname, 301)
	}

	if (import.meta.env.DEV) {
		return await input.resolve(input.event)
	}

	return sitemapHook(sitemap, {
		async getRobots() {
			return {
				userAgent: ['*'],
				paths: {}
			}
		},
		async getRoutes() {
			const guides = await getPostsFromMarkdowns(
				import.meta.glob<Mdsvex>('/src/md/guide/*.md')
			)
			const cores = await getPostsFromMarkdowns(
				import.meta.glob<Mdsvex>('/src/lib/core/*/*.md')
			)
			const integrations = await getPostsFromMarkdowns(
				import.meta.glob<Mdsvex>('/src/lib/integrations/*/*.md')
			)
			return {
				'/(docs)/[type]': guides.map(postMapper),
				'/(docs)/[type]/[slug]': cores
					.map(postMapper)
					.concat(integrations.map(postMapper))
			}
		}
	})(input)
}
