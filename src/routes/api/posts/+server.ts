import { json } from '@sveltejs/kit'

import type Mdsvex from '*.md'

const basename = (path: string) =>
	path.split('/').pop()?.split('.').shift() ?? ''
const filePath = (path: string) => '/' + basename(path)

const sortByList = (order: string[]) => (a: [string, any], b: [string, any]) =>
	[a[0], b[0]]
		.map((x) => order.indexOf(basename(x)))
		.reduce((x, y) => (x < 0 ? 1 : y < 0 ? -1 : x - y))

const fetchMarkdownPosts = async () => {
	const pageFiles = import.meta.glob<Mdsvex>('/src/routes/docs/pages/*.md')
	const functionFiles = import.meta.glob<Mdsvex>(
		'/src/routes/docs/functions/*.md'
	)
	const integrationFiles = import.meta.glob<Mdsvex>(
		'/src/routes/docs/integrations/*.md'
	)

	const iterablePageFiles = Object.entries(pageFiles)
	const iterableFunctionFiles = Object.entries(functionFiles)
	const iterableIntegrationFiles = Object.entries(integrationFiles)

	// returns an array of paths, /introduction from /src/routes/pages/introduction.md
	const pageOrder: string[] = [
		'introduction',
		'quickstart',
		'typescript',
		'compiler-speed',
		'how-to-contribute',
		'license'
	]
	const allPages = await Promise.all(
		iterablePageFiles
			.sort(sortByList(pageOrder))
			.map(async ([path, resolver]) => {
				const { metadata } = await resolver()
				return {
					meta: metadata,
					path: filePath(path)
				}
			})
	)

	// returns an array of paths, /icons from /src/routes/extend/icons.md
	const allFunctions = await Promise.all(
		iterableFunctionFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver()
			return {
				meta: metadata,
				path: filePath(path)
			}
		})
	)

	// returns an array of paths, /icons from /src/routes/extend/icons.md
	const allIntegrations = await Promise.all(
		iterableIntegrationFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver()
			return {
				meta: metadata,
				path: filePath(path)
			}
		})
	)

	return {
		pages: allPages,
		functions: allFunctions,
		integrations: allIntegrations
	}
}

export const GET = async () => {
	const allPosts = await fetchMarkdownPosts()
	return json(allPosts)
}
