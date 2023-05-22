---
layout: componentLayout
breadcrumb_title: useClipboard
title: useClipboard
component_title: useClipboard
dir: Integrations
---

Reactive [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API). Provides the ability to respond to clipboard commands (cut, copy, and paste) as well as to asynchronously read from and write to the system clipboard. Access to the contents of the clipboard is gated behind the [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API). Without user permission, reading or altering the clipboard contents is not permitted.

This implementation is original ported from [vueuse/useClipboard](https://vueuse.org/core/useClipboard)

## Usage

```svelte example

<script lang="ts">
	import { Button, Input } from 'flowbite-svelte'
	import { useClipboard, usePermission } from 'sveltuse'

	let input = ''

	const { text, isSupported, copy } = useClipboard()
	const permissionRead = usePermission('clipboard-read')
	const permissionWrite = usePermission('clipboard-write')
</script>

<div>
	{#if $isSupported}
		<div>
			<p class="text-xs dark:text-white">
				<note>
					Clipboard Permission: read <b>{$permissionRead}</b> | write
					<b>{$permissionWrite}</b>
				</note>
			</p>

			<div class="flex flex-col space-y-4 max-w-sm mt-4">
				<p class="text-base dark:text-white">
					Current copied: <code>{$text || 'none'}</code>
				</p>

				<Input
					value={input}
					type="text"
					placeholder="Text to copy.."
					on:input={(e) => {
						input = e.target?.value || ''
					}} />

				<div>
					<Button on:click={() => copy(input)}>Copy</Button>
				</div>
			</div>
		</div>
	{:else}
		<p>Your browser does not support Clipboard API</p>
	{/if}
</div>

```

Set `legacy: true` to keep the ability to copy if [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) is not available. It will handle copy with [execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand) as fallback.
