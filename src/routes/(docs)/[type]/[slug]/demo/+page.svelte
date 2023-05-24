<script lang="ts">
	import { Card } from 'flowbite-svelte'

	export let data
</script>

<div class="space-y-8">
	{#each data.demos as demo, index}
		<div>
			<div class="text-xl mb-1 opacity-50">#{index + 1}</div>
			<Card size="xl" class="">
				<svelte:component this={demo.default} />
			</Card>
		</div>
	{/each}
</div>
