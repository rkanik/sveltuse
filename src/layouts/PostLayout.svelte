<script>
	import { Heading } from 'flowbite-svelte'
	import { MetaTags } from 'svelte-meta-tags'
	import Footer from '../routes/utils/Footer.svelte'
	import { page } from '$app/stores'

	export let title = ''
	export let description = ''

	const {} = $page
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
			<!-- <Paging /> -->
		</div>
		<!-- <Newsletter /> -->
		<Footer />
	</div>
	<!-- <Toc {extract} headingSelector="#mainContent > :where(h2, h3)" /> -->
</div>
