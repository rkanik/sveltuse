---
id: 1
layout: PostLayout

# Sidebar link
href: /integrations/useDarkReader
hrefText:

# Heading
title: useDarkReader
description: Dark Reader analyzes web pages and aims to reduce eyestrain while browsing the web.
---

[Dark Reader](https://github.com/darkreader/darkreader) is an open-source MIT-licensed browser extension designed to analyze web pages. [Dark Reader](https://github.com/darkreader/darkreader) will generate a dark mode that aims to reduce the eyestrain of the user. [Dark Reader](https://github.com/darkreader/darkreader) is feature-rich and is customizable in many ways throughout the UI.

## Example

```svelte example
<script lang="ts">
	import { Button } from 'flowbite-svelte'
	import { useDarkReader } from 'sveltuse/integrations/useDarkReader'

	const darkReader = useDarkReader()
</script>

<div>
	<Button on:click={() => darkReader.toggle()}>Toggle</Button>
	<Button on:click={() => darkReader.toggle(true)}>Turn On</Button>
	<Button on:click={() => darkReader.toggle(false)}>Turn Off</Button>
</div>
```