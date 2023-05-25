---
id: 1
layout: PostLayout

# Sidebar link
href: /core/useToggle
hrefText:

# Heading
title: useToggle
description: A boolean switcher with utility functions.
related: useStates
---

## Example

```svelte example
<script lang="ts">
	import { Button } from 'flowbite-svelte'
	import { useToggle } from 'sveltuse'

	const [value, toggle] = useToggle()
</script>

<div>
	<p>Value: {$value ? 'ON' : 'OFF'}</p>

    <br />
    <Button on:click={() => toggle()}>Toggle</Button>
    <Button on:click={() => toggle(true)}>Set ON</Button>
    <Button on:click={() => toggle(false)}>Set OFF</Button>

</div>
```
