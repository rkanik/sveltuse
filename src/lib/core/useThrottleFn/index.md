---
id: 1
layout: PostLayout

# Sidebar link
href: /core/useThrottleFn
hrefText:

# Heading
title: useThrottleFn
description: Throttle execution of a function. Especially useful for rate limiting execution of handlers on events like resize and scroll.
related: useDebounceFn
---

> Throttle is a spring that throws balls: after a ball flies out it needs some time to shrink back, so it cannot throw any more balls unless it's ready.

<br/>

Ported from [vueuse/useThrottleFn](https://vueuse.org/core/useThrottleFn)

## Example
```svelte example
<script setup lang="ts">
	import { Button } from 'flowbite-svelte'
	import { useThrottleFn } from 'sveltuse'

	let updated = 0
	let clicked = 0

	const debouncedFn = useThrottleFn(() => {
		updated += 1
	}, 1000)

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
```

## Usage

```js
import { useThrottleFn } from 'sveltuse'

const throttledFn = useThrottleFn(() => {
  // do something, it will be called at most 1 time per second
}, 1000)

window.addEventListener('resize', throttledFn)
```

## Recommended Reading

- [**Debounce vs Throttle**: Definitive Visual Guide](https://redd.one/blog/debounce-vs-throttle)
