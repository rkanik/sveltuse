---
id: 1
layout: PostLayout

# Sidebar link
href: /core/useScroll
hrefText:

# Heading
title: useScroll
description: Reactive scroll position and state.
related: useInfiniteScroll, useWindowScroll
---

Ported from [vueuse/useScroll](https://vueuse.org/core/useScroll)

## Example

```svelte example
<script lang="ts">
	import { useDebounceFn, useScroll } from 'sveltuse'

	import BooleanDisplay from 'app/components/BooleanDisplay.svelte'
	import { Input } from 'flowbite-svelte'

	let el: HTMLElement
	let smooth = false

	const { x, y, isScrolling, arrivedState, directions } = useScroll(() => el, {
		behavior: () => (smooth ? 'smooth' : 'auto')
	})
</script>

<div class="flex">
	<div
		bind:this={el}
		class="w-[300px] h-[300px] m-auto overflow-scroll bg-gray-800 rounded">
		<div class="w-[600px] h-[600px] relative">
			<div class="p-3 x-2 y-1 bg-gray-700 absolute left-0 top-0">
				TopLeft
			</div>
			<div class="p-3 x-2 y-1 bg-gray-700 absolute left-0 bottom-0">
				BottomLeft
			</div>
			<div class="p-3 x-2 y-1 bg-gray-700 absolute right-0 top-0">
				TopRight
			</div>
			<div class="p-3 x-2 y-1 bg-gray-700 absolute right-0 bottom-0">
				BottomRight
			</div>
			<div class="p-3 x-2 y-1 bg-gray-700 absolute left-1/3 top-1/3">
				Scroll Me
			</div>
		</div>
	</div>
	<div class="m-auto w-280px pl-4">
		<div
			class="px-6 py-4 rounded grid grid-cols-[120px_auto] gap-2 bg-gray-500/5">
			<div class="flex items-center col-span-2 space-x-1">
				<span class="text-right opacity-75 flex-none">X Position</span>
				<Input
					value={Math.round($x)}
					min="0"
					max="800"
					step="100"
					type="number"
					on:input={useDebounceFn((e) => {
						x.set(+e.target.value)
					}, 200)} />
			</div>

    		<div class="flex items-center col-span-2 space-x-1">
    			<span class="text-right opacity-75 flex-none">Y Position</span>
    			<Input
    				value={Math.round($y)}
    				min="0"
    				max="800"
    				step="100"
    				type="number"
    				on:input={useDebounceFn((e) => {
    					y.set(+e.target.value)
    				}, 200)} />
    		</div>

    		<span class="text-right opacity-75">Smooth</span>
    		<input
    			class="mt-1"
    			type="checkbox"
    			checked={smooth}
    			on:input={(e) => (smooth = e.target.checked)} />

    		<span class="text-right opacity-75">isScrolling</span>
    		<BooleanDisplay value={$isScrolling} />
    		<div class="text-right opacity-75">Top Arrived</div>
    		<BooleanDisplay value={$arrivedState.top} />
    		<div class="text-right opacity-75">Right Arrived</div>
    		<BooleanDisplay value={$arrivedState.right} />
    		<div class="text-right opacity-75">Bottom Arrived</div>
    		<BooleanDisplay value={$arrivedState.bottom} />
    		<div class="text-right opacity-75">Left Arrived</div>
    		<BooleanDisplay value={$arrivedState.left} />
    		<div class="text-right opacity-75">Scrolling Up</div>
    		<BooleanDisplay value={$directions.top} />
    		<div class="text-right opacity-75">Scrolling Right</div>
    		<BooleanDisplay value={$directions.right} />
    		<div class="text-right opacity-75">Scrolling Down</div>
    		<BooleanDisplay value={$directions.bottom} />
    		<div class="text-right opacity-75">Scrolling Left</div>
    		<BooleanDisplay value={$directions.left} />
    	</div>
    </div>
</div>
```

## Usage

```svelte
<script lang="ts">
import { useScroll } from 'sveltuse'

let el: HTMLElement
const { x, y, isScrolling, arrivedState, directions } = useScroll(() => el)
</script>

<div bind:this={el}></div>
```

## With offsets

```ts
const { x, y, isScrolling, arrivedState, directions } = useScroll(el, {
	offset: { top: 30, bottom: 30, right: 30, left: 30 }
})
```

## Setting scroll position

Set the `x` and `y` values to make the element scroll to that position.

```svelte
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
```

## Directive Usage

```svelte
<script lang="ts">
	import { dScroll, type UseScrollReturn } from 'sveltuse'

	const onScroll = (e: UseScrollReturn) => {
		console.log('onScroll', e)
	}
</script>

<div use:dScroll={onScroll} class="mb-4 overflow-auto h-32 w-full bg-gray-700">
	<div class="h-[2400px] w-[2400px]" />
</div>
```
