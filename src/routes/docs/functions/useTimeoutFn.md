---
layout: componentLayout
breadcrumb_title: useTimeoutFn
title: useTimeoutFn
component_title: useTimeoutFn
dir: Integrations
---

Wrapper for `setTimeout` with controls.

This implementation is original ported from [vueuse/useTimeoutFn](https://vueuse.org/core/useTimeoutFn)

## Usage

```svelte example
<script lang="ts">
	import { Button } from 'flowbite-svelte'
	import { useTimeoutFn } from 'sveltuse'

	let isFired = false
	const { isPending, start, stop } = useTimeoutFn(() => {
		isFired = true
	}, 3000)
</script>

<div>
	<div class="mb-3">
		{#if $isPending}
			<div>Please wait for 3 seconds</div>
		{:else if isFired}
			<div>Fired!</div>
		{/if}
	</div>
	<div class="flex space-x-3">
		<Button on:click={start} disabled={$isPending} color="green"
			>Start</Button>
		{#if $isPending}
			<Button on:click={stop} color="red">Stop</Button>
		{/if}
	</div>
</div>
```
