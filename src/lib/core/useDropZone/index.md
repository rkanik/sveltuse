---
id: 1
layout: PostLayout

# Sidebar link
href: /core/useDropZone
hrefText: 

# Heading
title: useDropZone
description: Create a zone where files can be dropped.
---

This implementation is ported from [vueuse/useDropZone](https://vueuse.org/core/useDropZone)

## Usage

```svelte example
<script lang="ts">
	import { useDropZone } from 'sveltuse'

	let files: File[] = []
	let container: HTMLDivElement

	const { isOverDropZone } = useDropZone(
		() => container,
		(droppedFiles) => {
			if (droppedFiles) {
				files = droppedFiles
				console.log(droppedFiles)
			}
		}
	)

	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte'
</script>

<div class="flex items-center space-x-2">
	<img src="/images/favicon.svg" alt="Favicon" class="w-16" />
	<div class="italic text-sm">Drag the logo into dropzone</div>
</div>
<div
	bind:this={container}
	class="border-2 border-dashed rounded mt-4 p-4 min-h-[200px] relative {$isOverDropZone
		? 'bg-green-500 bg-opacity-10 border-green-500'
		: 'bg-gray-800 border-gray-600'}">
	{#if files.length}
		<Table divClass="border rounded overflow-hidden border-gray-700">
			<TableHead>
				<TableHeadCell>Name</TableHeadCell>
				<TableHeadCell>Type</TableHeadCell>
				<TableHeadCell>Size</TableHeadCell>
				<TableHeadCell>Last Modified</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each files as file}
					<TableBodyRow>
						<TableBodyCell>{file.name}</TableBodyCell>
						<TableBodyCell>{file.type}</TableBodyCell>
						<TableBodyCell>{file.size}</TableBodyCell>
						<TableBodyCell>{file.lastModified}</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	{/if}

	{#if !files.length || $isOverDropZone}
		<div
			class="absolute inset-0 flex flex-col justify-center items-center {files.length &&
			$isOverDropZone
				? 'bg-black bg-opacity-80'
				: ''}">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="64"
				height="64"
				viewBox="0 0 24 24">
				<path
					fill="currentColor"
					d="M8.71 7.71L11 5.41V15a1 1 0 0 0 2 0V5.41l2.29 2.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42l-4-4a1 1 0 0 0-.33-.21a1 1 0 0 0-.76 0a1 1 0 0 0-.33.21l-4 4a1 1 0 1 0 1.42 1.42ZM21 12a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6a1 1 0 0 0-2 0v6a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1Z" />
			</svg>
			<div class="mt-4 text-lg">Drag and drop files here</div>
			<div class="text-center max-w-sm text-sm">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit.
			</div>
		</div>
	{/if}
</div>

```
