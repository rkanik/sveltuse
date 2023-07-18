<script>
	import { useMenu } from 'sveltuse'
	import { fly } from 'svelte/transition'

	let activatorEl
	let contentEl

	const a = useMenu({
		activatorEl: () => activatorEl,
		contentEl: () => contentEl
	})
</script>

<div>
	<button bind:this={activatorEl} class="bg-gray-700 h-10 rounded px-20">
		Click me
	</button>
	<div bind:this={contentEl} class="bg-gray-600 p-4 rounded mt-1">
		<div transition:fly={{ duration: 200, y: 5 }}>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit.
		</div>
	</div>
</div>
