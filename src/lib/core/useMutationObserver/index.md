---
id: 1
layout: PostLayout

# Sidebar link
href: /core/useMutationObserver
hrefText:

# Heading
title: useMutationObserver
description:
related: useResizeObserver
---


Watch for changes being made to the DOM tree. [MutationObserver MDN](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

Ported from [vueuse/useMutationObserver](https://vueuse.org/core/useMutationObserver)

## Example

```svelte example
<script lang="ts">
	import { useMutationObserver } from 'sveltuse'

	let el: HTMLDivElement
	let messages: string[] = []

	let style: string = ''
	let className: string = ''

	useMutationObserver(
		() => el,
		(mutations) => {
			const mutation = mutations[0]
			if (!mutation) return
			messages = [...messages, mutation.attributeName!]
		},
		{ attributes: true }
	)

	setTimeout(() => {
		className = 'test test2'
	}, 1000)

	setTimeout(() => {
		style = 'color:red'
	}, 1550)
</script>

<div bind:this={el} class={className} {style}>
	{#each messages as message}
		<div>
			Mutation Attribute: {message}
		</div>
	{/each}
</div>
```