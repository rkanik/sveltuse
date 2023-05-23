<script lang="ts">
	import { useEventListener } from 'sveltuse'

	let container: HTMLDivElement

	let counter = 0
	useEventListener(
		() => container,
		['click', 'scroll'],
		() => {
			counter += 1
		}
	)
</script>

<div>
	<div class="mb-2">Click the container</div>

	<div
		bind:this={container}
		class="p-8 border-2 border-dashed rounded border-gray-600 h-64 overflow-auto">
		<div class="h-96">Container</div>
	</div>

	<div class="mt-4">
		{#if counter}
			<div class="text-green-500">
				Clicked {counter} times.
			</div>
		{/if}
	</div>
</div>

<!-- <script lang="ts">
	import { Button } from 'flowbite-svelte'
	import { writable } from 'svelte/store'
	import { useEventListener } from 'sveltuse'

	let isOne = true
	let container: HTMLDivElement | null = null
	let containerStore = writable<HTMLDivElement | null>(container)

	let message = ''
	useEventListener(containerStore, 'click', (event) => {
		if (event.target) {
			message = 'Clicked on ' + event.target.innerText
		}
	})

	$: {
		containerStore.set(container)
	}
</script>

<div>
	<div class="mb-2">Click the container</div>
	{#if isOne}
		<div
			bind:this={container}
			class="p-8 border-2 border-dashed rounded border-gray-600">
			Container One
		</div>
	{:else}
		<div
			bind:this={container}
			class="p-8 border-2 border-dashed rounded border-gray-600">
			Container Two
		</div>
	{/if}

	<div class="mt-4">
		{#if message}
			<div class="text-green-500">
				{message}
			</div>
		{/if}
		<Button
			class="mt-2"
			on:click={() => {
				isOne = !isOne
			}}>
			Toggle
		</Button>
	</div>
</div> -->
