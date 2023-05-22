<script lang="ts">
	import { Button } from 'flowbite-svelte'
	import { onDestroy } from 'svelte'
	// import { useScriptTag } from 'sveltuse'

	// useScriptTag(
	// 	'https://player.twitch.tv/js/embed/v1.js',
	// 	// on script tag loaded.
	// 	(el: HTMLScriptElement) => {
	// 		// do something
	// 	}
	// )

	// 2
	import { useScriptTag } from 'sveltuse'

	const { scriptTag, load, unload } = useScriptTag(
		'https://player.twitch.tv/js/embed/v1.js',
		() => {
			// do something
		},
		{ manual: true }
	)

	// manual controls
	const onLoadScript = async () => {
		await load()
		// do something
	}

	onDestroy(() => {
		unload()
		// script has been removed from DOM
	})
</script>

<div>
	<Button on:click={onLoadScript}>Load the script</Button>
</div>
