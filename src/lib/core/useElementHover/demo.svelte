<script lang="ts">
	import { useElementHover } from 'sveltuse'

	let container: HTMLDivElement
	let container2: HTMLDivElement

	const isHovered = useElementHover(() => container)
	const isHovered2 = useElementHover(() => container2, {
		delayEnter: 500,
		delayLeave: 500
	})
</script>

<div class="flex space-x-4 items-center">
	<div
		bind:this={container}
		class="text-white h-9 rounded inline-flex px-4 items-center justify-center bg-green-500">
		{$isHovered ? 'Thank you!' : 'Hover me'}
	</div>
	<div class="flex items-center space-x-2">
		<div
			bind:this={container2}
			class="text-white h-9 rounded inline-flex px-4 items-center justify-center bg-green-500">
			{$isHovered2 ? 'Thank you!' : 'Delayed Hover'}
		</div>
		<div class="italic text-sm">Hover is delayed</div>
	</div>
</div>