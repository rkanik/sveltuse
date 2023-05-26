---
id: 1
layout: PostLayout

# Sidebar link
href: /core/useContext
hrefText:

# Heading
title: useContext
description: Reactive Context API
---

Wrapper for `setContext` and `getContext`. Always returns reactive `Writable<T>` across nested components.

## Usage

```ts
// Parent
import { useContext } from 'sveltuse'

const time = useContext('time', new Date())
```

```ts
// Child One
const time = useContext<Date>('time')
```

```ts
// Another nested child
const time = useContext<Date>('time')
```


## Example

```svelte example hideCode
<script lang="ts">
	import { Button } from 'flowbite-svelte'
	import { useContext } from 'sveltuse'
	const time = useContext<Date>('time')
</script>

<div>
	<div class="text-left">
		<div>Now: {$time.getTime()}</div>
		<div>Datetime: {$time}</div>
	</div>

	<div class="mt-4">
		<Button on:click={() => time.set(new Date())}>Click me</Button>
	</div>
</div>
```

```svelte example
<script lang="ts">
	import { Button } from 'flowbite-svelte'
	import { useContext } from 'sveltuse'
	const time = useContext<Date>('time')
</script>

<div>
	<div class="text-left">
		<div>Now: {$time.getTime()}</div>
		<div>Datetime: {$time}</div>
	</div>

	<div class="mt-4">
		<Button on:click={() => time.set(new Date())}>Click me</Button>
	</div>
</div>
```

## Advanced

Note: All of the below examples will return exactly same `Writable<Date>`.

```ts
useContext('time', new Date())
// useContext('time', () => new Date())
// useContext('time', readable(new Date()))
// useContext('time', writable(new Date()))
// useContext('time', () => readable(new Date()))
// useContext('time', () => writable(new Date()))
```