---
id: 1
layout: PostLayout

# Sidebar link
href: /core/useWindowScroll
hrefText:

# Heading
title: useWindowScroll
description: Reactive window scroll.
related: useScroll, useInfiniteScroll
---

Ported from [vueuse/useWindowScroll](https://vueuse.org/core/useWindowScroll)


## Example

```svelte example
<script lang="ts">
	import { useWindowScroll } from 'sveltuse'

	const { x, y } = useWindowScroll()
</script>

<div>
	<div>See scroll values in the lower right corner of the screen.</div>
	<div class="scroller" />
	<div
		class="fixed right-4 bottom-4 bg-gray-100 dark:bg-gray-700 p-5 rounded border-2 border-dashed border-primary-500">
		<note class="mb-2"> Scroll value </note><br />
		x: {$x}<br />
		y: {$y}
	</div>
</div>

<style>
	.scroller {
		position: absolute;
		top: 100%;
		left: 100%;
		width: 10000px;
		height: 10000px;
	}
</style>
```