---
id: 1
layout: PostLayout

# Sidebar link
href: /core/useInfiniteScroll
hrefText:

# Heading
title: useInfiniteScroll
description: Infinite scrolling of the element.
related: useScroll, useWindowScroll
---

Ported from [vueuse/useInfiniteScroll](https://vueuse.org/core/useInfiniteScroll)

## Example

```svelte example
<script lang="ts">
	import { Spinner } from 'flowbite-svelte'
	import { useInfiniteScroll } from 'sveltuse'

	import sleep from 'sveltuse/utils/sleep'

	let el: HTMLElement
	let data: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

	const { isLoading } = useInfiniteScroll(
		() => el,
		async () => {
			await sleep(500)
			const length = data.length + 1
			data = [...data, ...Array.from({ length: 10 }, (_, i) => length + i)]
		},
		{
			distance: 10,
			interval: 100
		}
	)
</script>

<div class="relative w-[300px] m-auto">
	<div
		bind:this={el}
		class="flex flex-col gap-2 p-4 h-[300px] overflow-y-scroll bg-gray-500/5 rounded">
		{#each data as item}
			<div class="h-15 bg-gray-500/5 rounded p-3">
				{item}
			</div>
		{/each}
	</div>
	{#if $isLoading}
		<div
			class="absolute bottom-0 inset-x-0 flex justify-center items-center space-x-2 py-1 bg-gray-800">
			<Spinner size="4" />
			<span class="text-sm">Loading...</span>
		</div>
	{/if}
</div>
```

## Directive Usage

```svelte
<script lang="ts">
	import { dInfiniteScroll } from 'sveltuse'
	const onLoadMore = async () => {
		// fetch more data
	}
</script>

<div use:dInfiniteScroll={onLoadMore} />
```

Or with options

```svelte
<div
   use:dInfiniteScroll={[onLoadMore, {
      // options goes here...
   }]}
/>
```