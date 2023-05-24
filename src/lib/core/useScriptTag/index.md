---
id: 1
layout: PostLayout

# Sidebar link
href: /core/useScriptTag
hrefText:

# Heading
title: useScriptTag
description: Script tag injecting.
---

This implementation is original ported from [vueuse/useScriptTag](https://vueuse.org/core/useScriptTag)

## Usage

```svelte example
<script lang="ts">
	import { useScriptTag } from 'sveltuse'

	useScriptTag(
		'https://player.twitch.tv/js/embed/v1.js',
		// on script tag loaded.
		(el: HTMLScriptElement) => {
			// do something
		}
	)
</script>
```

The script will be automatically loaded on the component mounted and removed when the component on unmounting.

## Configurations

Set `manual: true` to have manual control over the timing to load the script.

```svelte example
<script lang="ts">
	import { Button } from 'flowbite-svelte'
	import { onDestroy } from 'svelte'

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

```
