<script lang="ts">
	import { useResizeObserver } from 'sveltuse'

	let text = ''
	let el: HTMLTextAreaElement

	useResizeObserver(
		() => el,
		(entries) => {
			const [entry] = entries
			const { width, height } = entry.contentRect
			text = 'width: ' + width + '\nheight: ' + height
		}
	)
</script>

<div class="flex flex-col">
	<note class="mb-2"> Resize the box to see changes </note>
	<textarea
		bind:this={el}
		class="resize dark:bg-gray-700 rounded"
		disabled
		value={text}
		rows="6" />
</div>
