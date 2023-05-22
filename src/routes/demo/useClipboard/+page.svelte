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
