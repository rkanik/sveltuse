<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags'
	// import type { PageData } from './$types'
	// import Components from './landing/Components.svelte'
	// import Featured from './landing/Featured.svelte'
	import Hero from './landing/Hero.svelte'
	import Footer from './utils/Footer.svelte'
	// import Contributors from './landing/Contributors.svelte'
	// import DesignFigma from './landing/DesignFigma.svelte'
	import GetStarted from './landing/GetStarted.svelte'
	// import SocialProof from './landing/SocialProof.svelte'

	// export let data: PageData

	let title = 'Sveltuse - Composition Utilities'
	let description = 'Sveltuse Collection of Svelte Composition Utilities'
	const image = `https://i.ibb.co/JdJHRqx/sveltuse.png`
</script>

<MetaTags
	{title}
	{description}
	facebook={{ appId: '453670756870545' }}
	openGraph={{
		type: 'website',
		url: `https://sveltuse.pages.dev/`,
		title: `${title}`,
		description: `${description}`,
		images: [{ url: image, width: 1200, height: 630, alt: `${title}` }],
		site_name: 'Sveltuse'
	}}
	twitter={{
		handle: '@shinokada',
		cardType: 'summary_large_image',
		title: `${title}`,
		description: `${description}`,
		image,
		imageAlt: `${title} logo`
	}} />

<main
	class="flex-auto min-w-0 lg:static lg:max-h-full lg:overflow-visible divide-y dark:divide-gray-700">
	<Hero />
	<!-- <Featured /> -->
	<!-- <Components {data} /> -->
	<!-- <SocialProof /> -->
	<!-- <DesignFigma /> -->
	<!-- <Contributors {data} /> -->
	<GetStarted />
	<Footer />
</main>
