<script context="module">
	import h2 from 'components/tags/H2.svelte'
	import h3 from 'components/tags/H3.svelte'
	import code from 'components/tags/Code.svelte'

	export { h2, h3, code }
</script>

<script>
	import { page } from '$app/stores'
	import { MetaTags } from 'svelte-meta-tags'
	import { Heading, PaginationItem } from 'flowbite-svelte'

	import Icon from '@iconify/svelte'
	import Footer from '../routes/utils/Footer.svelte'
	import { Toc } from '../routes/utils'

	export let id = ''
	export let layout = ''
	export let href = ''
	export let hrefText = ''
	export let title = ''
	export let description = ''

	$: id, layout, href, hrefText

	function extract(x) {
		if (x.firstElementChild)
			return {
				rel: x.tagName,
				href: '#' + x.firstElementChild?.id,
				name: x?.firstChild?.nodeValue ?? ''
			}
		return { name: '' }
	}

	const posts = $page.data.postGroups.reduce((posts, group) => {
		return posts.concat(group.items)
	}, [])

	const index = posts.findIndex((post) => {
		return post.href === $page.url.pathname
	})
</script>

<MetaTags {title} {description} titleTemplate="%s - Sveltuse" />

<div class="flex w-full">
	<div
		class="flex flex-col max-w-4xl w-full mx-auto px-4 min-w-0 pt-6 lg:px-8 lg:pt-8 pb:12 xl:pb-24 lg:pb-16 divide-y divide-gray-200 dark:divide-gray-800">
		<Heading
			tag="h1"
			customSize="text-3xl"
			class="inline-block mb-2 font-extrabold tracking-tight text-gray-900 dark:text-white">
			{title}
		</Heading>

		<div id="mainContent" class="py-8">
			<slot />
			<div class="flex flex-col items-start gap-4 py-4">
				{#if index >= 0}
					<div class="flex flex-row justify-between gap-2.5 self-stretch">
						{#if index > 0}
							{@const post = posts[index - 1]}
							<PaginationItem
								href={post.href}
								class="flex items-center gap-2.5 hover:text-primary-700  dark:hover:text-primary-700">
								<Icon class="text-lg" icon="mdi-arrow-left" />
								{post.hrefText || post.title}
							</PaginationItem>
						{:else}
							<div />
						{/if}
						{#if index < posts.length - 1}
							{@const post = posts[index + 1]}
							<PaginationItem
								href={post.href}
								class="flex items-center gap-2.5 hover:text-primary-700 dark: dark:hover:text-primary-700">
								{post.hrefText || post.title}
								<Icon class="text-lg" icon="mdi-arrow-right" />
							</PaginationItem>
						{/if}
					</div>
				{/if}
			</div>
		</div>
		<!-- <Newsletter /> -->
		<Footer />
	</div>
	<Toc {extract} headingSelector="#mainContent > :where(h2, h3)" />
</div>
