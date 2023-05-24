---
id: 1
layout: PostLayout

# Sidebar link
href: /core/useEyeDropper
hrefText:

# Heading
title: useEyeDropper
description:
---

Reactive [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API)<br/>
Ported from [vueuse/useEyeDropper](https://vueuse.org/core/useEyeDropper)

## Usage

```svelte example
<script lang="ts">
	import Icon from '@iconify/svelte'

	import { Button, Tooltip } from 'flowbite-svelte'
	import { useClipboard, useEyeDropper } from 'sveltuse'

	const { copied, copy } = useClipboard()
	const { isSupported, sRGBHex, open } = useEyeDropper()
</script>

<div>
	<div>isSupported: {$isSupported}</div>
	<div class="flex items-center space-x-2">
		<span>sRGBHex: {$sRGBHex}</span>
		{#if $sRGBHex}
			<button on:click={() => copy($sRGBHex)}>
				<Icon class="hover:text-primary-500" icon="mdi-content-copy" />
			</button>
			<Tooltip>{$copied ? 'Copied' : 'Copy'}</Tooltip>
		{/if}
	</div>
	<Button class="mt-4" on:click={() => open()}>Open Eye Dropper</Button>
</div>

```
