<script lang="ts">
	import { page } from '$app/stores'
	import { Card } from 'flowbite-svelte'

	export let data
</script>

<div class="space-y-8">
	{#each data.demos as demo, index}
		<div>
			<a
				href={$page.url.pathname + '/' + (index + 1)}
				class="text-xl mb-1 opacity-50">#{index + 1}</a>
			<Card size="xl" class="">
				<svelte:component this={demo.default} />
			</Card>
		</div>
	{/each}
</div>
