<script lang="ts">
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'
	import docsearch from '@docsearch/js'

	let searchContainer: HTMLElement

	onMount(() => {
		if (browser) {
			// Algolia docsearch
			docsearch({
				container: searchContainer,
				appId: 'R1GY4NRW12',
				indexName: 'sveltuse',
				apiKey: 'cc0369a821444450a61a01eb686c902a',
				placeholder: 'Search documentation'
			})
		}
	})
</script>

<div bind:this={searchContainer} id="docsearch" class="ml-3 xl:pl-4" />
