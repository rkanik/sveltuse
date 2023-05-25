<script lang="ts">
	import { useStates } from 'sveltuse'

	const tabs = ['Chats', 'Calls'] as const
	const tabState = useStates(tabs, 'Chats')
</script>

<div>
	<div class="flex space-x-1">
		{#each tabs as tab}
			<button
				class="px-3 pt-1 pb-2 {$tabState === tab
					? 'text-primary-500 bg-gray-700'
					: ''}"
				on:click={() => tabState.set(tab)}>{tab}</button>
		{/each}
	</div>
	<div class="bg-gray-700 p-5">
		{#if $tabState === 'Chats'}
			<div>
				<div class="text-lg font-bold">{$tabState}</div>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, quae.
			</div>
		{/if}
		{#if $tabState === 'Calls'}
			<div>
				<div class="text-lg font-bold">{$tabState}</div>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse atque magnam
				molestiae, magni iure illo reprehenderit odit eum. Iste, quaerat?
			</div>
		{/if}
	</div>
</div>
