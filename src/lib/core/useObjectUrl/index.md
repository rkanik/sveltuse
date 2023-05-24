---
id: 1
layout: PostLayout

# Sidebar link
href: /core/useObjectUrl
hrefText:

# Heading
title: useObjectUrl
description: Reactive URL representing an object.
---

Creates an URL for the provided `File`, `Blob`, or `MediaSource` via [URL.createObjectURL()](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL) and automatically releases the URL via [URL.revokeObjectURL()](https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL) when the source changes or the component is unmounted.

This implementation is original ported from [vueuse/useObjectUrl](https://vueuse.org/core/useObjectUrl)

## Usage

```svelte example
<script lang="ts">
	import { writable } from 'svelte/store'
	import { useObjectUrl } from 'sveltuse'

	const file = writable<File>()
	const fileUrl = useObjectUrl(file)

	const onInputFile = (event: any) => {
		file.set(event.target.files[0])
	}
</script>

<div>
	<div>
		<div>Select file:</div>
		<input type="file" on:input={onInputFile} />
	</div>
	<br />
	<div>
		<div>Object URL:</div>
		<div>{$fileUrl || ''}</div>
	</div>
</div>
```

## Multiple Files

```svelte example
<script lang="ts">
	import { writable } from 'svelte/store'
	import { useObjectUrl } from 'sveltuse'

	const files = writable<File[]>()
	const fileUrls = useObjectUrl(files)

	const onInputFile = (event: any) => {
		files.set(Array.from(event.target.files))
	}
</script>

<div>
	<div>
		<div>Select file:</div>
		<input multiple type="file" on:input={onInputFile} />
	</div>
	<br />
	<div>
		<div>Object URL:</div>
		{#if Array.isArray($fileUrls)}
			{#each $fileUrls as url}
				<div>{url}</div>
			{/each}
		{/if}
	</div>
</div>
```

## Manually triggering

We have manually trigger the create method as it's not possible to directly watch changes of the `file` variable.

```svelte example
<script lang="ts">
	import { useObjectUrl } from 'sveltuse'

	let file: File
	const fileUrl = useObjectUrl(() => file)

	const onInputFile = (event: any) => {
		file = event.target.files[0]
		fileUrl.create()
	}
</script>

<div>
	<div>
		<div>Select file:</div>
		<input type="file" on:input={onInputFile} />
	</div>
	<br />
	<div>
		<div>Object URL:</div>
		<div>{$fileUrl || ''}</div>
	</div>
</div>
```
