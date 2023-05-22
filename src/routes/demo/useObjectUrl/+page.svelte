<!-- 4 -->
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

<!-- 3 -->
<!-- <script lang="ts">
	import { useObjectUrl } from 'sveltuse'

	const form = {
		file: undefined
		// other properties
	}
	const fileUrl = useObjectUrl(() => {
		return form.file
	})

	const onInputFile = (event: any) => {
		form.file = event.target.files[0]
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
</div> -->

<!-- 2 -->
<!-- <script lang="ts">
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
</div> -->

<!-- 1 -->
<!-- <script lang="ts">
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
</div> -->
