<script lang="ts">
	import { useMutationObserver } from 'sveltuse'

	let el: HTMLDivElement
	let messages: string[] = []

	let style: string = ''
	let className: string = ''

	useMutationObserver(
		() => el,
		(mutations) => {
			const mutation = mutations[0]
			if (!mutation) return
			messages = [...messages, mutation.attributeName!]
		},
		{ attributes: true }
	)

	setTimeout(() => {
		className = 'test test2'
	}, 1000)

	setTimeout(() => {
		style = 'color:red'
	}, 1550)
</script>

<div bind:this={el} class={className} {style}>
	{#each messages as message}
		<div>
			Mutation Attribute: {message}
		</div>
	{/each}
</div>
