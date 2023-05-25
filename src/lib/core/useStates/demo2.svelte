<script lang="ts">
	import { useStates } from 'sveltuse'

	const colors = ['red', 'green', 'blue'] as const
	const currentColor = useStates(colors, 'red')
</script>

<div>
	<div>
		Current color: <span
			style="background-color:{$currentColor};"
			class="w-20 py-1 text-white inline-block text-center rounded"
			>{$currentColor}</span>
	</div>
	<div class="flex space-x-1 mt-4">
		{#each colors as color}
			<button
				style="background-color:{color};"
				class="w-20 py-2 text-white inline-block text-center rounded"
				on:click={() => currentColor.set(color)}>{color}</button>
		{/each}
	</div>
</div>
