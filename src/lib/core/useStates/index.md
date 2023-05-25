---
id: 1
layout: PostLayout

# Sidebar link
href: /core/useStates
hrefText:

# Heading
title: useStates
description: Reactive state with control to toggle between states
related: useToggle
---

## Usage

```ts
import { useStates } from 'sveltuse'

const colors = ['red', 'green', 'blue'] as const
const currentColor = useStates(colors, 'red')

currentColor.set('green')
```

Here `as const` is important for better auto complete. Access the `currentColor` reactive variable with `$currentColor`

Or using enum

```ts
enum Status {
	Active,
	Pending,
	InProgress,
	Cancelled
}

const currentStatus = useStates(Status, Status.Active)

currentStatus.set(Status.InProgress)
currentStatus.set((v) => v.Cancelled)
```

## Example

```svelte example
<script lang="ts">
	import { useStates } from 'sveltuse'

	const colors = ['red', 'green', 'blue'] as const
	const currentColor = useStates(colors, 'red')
</script>

<div>
	<div>
		Current color: <span
			style="background-color:{$currentColor};"
			class="w-20 py-1 text-white inline-block text-center rounded"
			>{$currentColor}</span>
	</div>
	<div class="flex space-x-1 mt-4">
		{#each colors as color}
			<button
				style="background-color:{color};"
				class="w-20 py-2 text-white inline-block text-center rounded"
				on:click={() => currentColor.set(color)}>{color}</button>
		{/each}
	</div>
</div>
```

## Example2

```svelte example
<script lang="ts">
	import { useStates } from 'sveltuse'

	const tabs = ['Chats', 'Calls'] as const
	const tabState = useStates(tabs, 'Chats')
</script>

<div>
	<div class="flex space-x-1">
		{#each tabs as tab}
			<button
				class="px-3 pt-1 pb-2 {$tabState === tab
					? 'text-primary-500 bg-gray-700'
					: ''}"
				on:click={() => tabState.set(tab)}>{tab}</button>
		{/each}
	</div>
	<div class="bg-gray-700 p-5">
		{#if $tabState === 'Chats'}
			<div>
				<div class="text-lg font-bold">{$tabState}</div>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, quae.
			</div>
		{/if}
		{#if $tabState === 'Calls'}
			<div>
				<div class="text-lg font-bold">{$tabState}</div>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse atque magnam
				molestiae, magni iure illo reprehenderit odit eum. Iste, quaerat?
			</div>
		{/if}
	</div>
</div>

```
