<script lang="ts">
	import { Button } from 'flowbite-svelte'
	import { useScroll } from 'sveltuse'

	let el: HTMLElement
	const { x, y } = useScroll(() => el)
</script>

<div>
	<div bind:this={el} class="mb-4 overflow-auto h-32 w-full bg-gray-700">
		<div class="h-[2400px] w-[2400px]" />
	</div>
	<Button on:click={() => x.update((x) => x + 100)}>Scroll right 100px</Button>
	<Button on:click={() => y.update((y) => y + 100)}>Scroll down 100px</Button>
</div>
