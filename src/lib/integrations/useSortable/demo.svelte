<script>
	import { writable } from 'svelte/store'
	import { useSortable } from 'sveltuse/integrations'

	const options = {
		group: 'items',
		animation: 150
	}

	let list1
	let items = writable(
		[...Array(5).keys()].map((index) => ({
			name: `Item ${index + 1}`
		}))
	)
	useSortable({
		items,
		element: () => list1,
		...options
	})

	let list2
	const listItems2 = writable(
		[...Array(5).keys()].map((index) => ({
			name: `[L2] Item ${index + 1}`
		}))
	)
	useSortable({
		items: listItems2,
		element: () => list2,
		...options
	})
</script>

<div class="container mx-auto">
	<div class="grid grid-cols-2 gap-4">
		<div>
			<strong>List One</strong>
			<ul bind:this={list1} class="flex flex-col space-y-2">
				{#each $items as item}
					<li
						class="px-4 py-2 bg-base-200 rounded bg-blue-900 bg-opacity-50">
						{item.name}
					</li>
				{/each}
			</ul>
		</div>
		<div>
			<strong>List Two</strong>
			<ul bind:this={list2} class="flex flex-col space-y-2">
				{#each $listItems2 as item}
					<li
						class="px-4 py-2 bg-base-200 rounded bg-green-500 bg-opacity-20">
						{item.name}
					</li>
				{/each}
			</ul>
		</div>
	</div>
	<div
		class="col-span-7 grid grid-cols-2 gap-4 bg-gray-900 rounded-md p-4 mt-4">
		<pre><code>{@html JSON.stringify($items, null, 1)}</code></pre>
		<pre><code>{@html JSON.stringify($listItems2, null, 1)}</code></pre>
	</div>
</div>
