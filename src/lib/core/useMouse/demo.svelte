<script lang="ts">
	import { useMouse, type UseMouseEventExtractor } from 'sveltuse'

	// Basic
	const { x, y, sourceType } = useMouse()

	// Extractor
	let container: HTMLDivElement
	const extractor: UseMouseEventExtractor = (event) =>
		event instanceof Touch ? null : [event.offsetX, event.offsetY]
	const {
		x: ex,
		y: ey,
		sourceType: eSourceType
	} = useMouse({
		type: extractor,
		target: () => container
	})
</script>

<div bind:this={container}>
	<!-- Basic -->
	<div>Basic Usage</div>
	<div>x: {$x}</div>
	<div>y: {$y}</div>
	<div>sourceType: {$sourceType}</div>

	<!-- Extractor -->
	<div class="mt-8">Extractor Usage</div>
	<div>x: {$ex}</div>
	<div>y: {$ey}</div>
	<div>sourceType: {$eSourceType}</div>
</div>
