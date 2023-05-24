---
id: 1
layout: PostLayout

# Sidebar link
href: /core/useCounter
hrefText:

# Heading
title: useCounter
description: Basic counter with utility functions.
---

## Usage

```svelte example
<script lang="ts">
	import { Button } from 'flowbite-svelte'
	import { useCounter } from 'sveltuse'

	const { count, inc, dec, set, reset } = useCounter(1, { min: 0, max: 100 })
</script>

<div>
	<div class="mb-3">
		Count: {$count}
	</div>

	<div class="flex flex-wrap -ml-3 -mt-3">
		<Button class="ml-3 mt-3" color="blue" on:click={() => inc()}>
			Increment
		</Button>
		<Button class="ml-3 mt-3" color="yellow" on:click={() => dec()}>
			Decrement
		</Button>
		<Button class="ml-3 mt-3" color="blue" on:click={() => inc(5)}>
			Increment (+5)
		</Button>
		<Button class="ml-3 mt-3" color="yellow" on:click={() => dec(5)}>
			Decrement (-5)
		</Button>
		<Button class="ml-3 mt-3" color="green" on:click={() => set(99)}>
			Set (99)
		</Button>
		<Button class="ml-3 mt-3" color="red" on:click={() => reset()}>
			Reset
		</Button>
	</div>
</div>

```
