---
id: 1
layout: PostLayout

# Sidebar link
href: /core/useMediaQuery
hrefText:

# Heading
title: useMediaQuery
description:
---

Reactive [Media Query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries). Once you've created a MediaQueryList object, you can check the result of the query or receive notifications when the result changes.

This implementation is original ported from [vueuse/useMediaQuery](https://vueuse.org/core/useMediaQuery)

## Usage

```svelte example
<script lang="ts">
	import { useMediaQuery } from 'sveltuse'

	const isLargeScreen = useMediaQuery('(min-width: 1024px)')
	const isPreferredDark = useMediaQuery('(prefers-color-scheme: dark)')
</script>

<div>
	<div>isLargeScreen: {$isLargeScreen}</div>
	<div>prefersDark: {$isPreferredDark}</div>
</div>

```
