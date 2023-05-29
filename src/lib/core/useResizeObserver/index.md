---
id: 1
layout: PostLayout

# Sidebar link
href: /core/useResizeObserver
hrefText:

# Heading
title: useResizeObserver
description: Reports changes to the dimensions of an Element's content or the border-box.
related: useMutationObserver
---

Ported from [vueuse/useResizeObserver](https://vueuse.org/core/useResizeObserver)

## Usage

```svelte example
<script lang="ts">
	import { useResizeObserver } from 'sveltuse'

	let text = ''
	let el: HTMLTextAreaElement

	useResizeObserver(
		() => el,
		(entries) => {
			const [entry] = entries
			const { width, height } = entry.contentRect
			text = 'width: ' + width + '\nheight: ' + height
		}
	)
</script>

<div class="flex flex-col">
	<note class="mb-2"> Resize the box to see changes </note>
	<textarea
		bind:this={el}
		class="resize dark:bg-gray-800 rounded"
		disabled
		value={text}
		rows="6" />
</div>
```