<script lang="ts">
	import { dScroll, type UseScrollReturn } from 'sveltuse'

	const onScroll = (e: UseScrollReturn) => {
		console.log('onScroll', e)
	}
</script>

<div use:dScroll={onScroll} class="mb-4 overflow-auto h-32 w-full bg-gray-700">
	<div class="h-[2400px] w-[2400px]" />
</div>
