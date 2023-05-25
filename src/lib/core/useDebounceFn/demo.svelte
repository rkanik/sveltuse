<script setup lang="ts">
	import { Button } from 'flowbite-svelte'
	import { useDebounceFn } from 'sveltuse'

	let updated = 0
	let clicked = 0

	const debouncedFn = useDebounceFn(
		() => {
			updated += 1
		},
		1000,
		{ maxWait: 5000 }
	)

	function clickedFn() {
		clicked += 1
		debouncedFn()
	}
</script>

<div>
	<note>
		Delay is set to 1000ms and maxWait is set to 5000ms for this demo.
	</note>
	<p>Button clicked: {clicked}</p>
	<p>Event handler called: {updated}</p>
	<br />
	<Button on:click={clickedFn}>Smash me!</Button>
</div>
