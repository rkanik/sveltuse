<script lang="ts">
	import { dInfiniteScroll } from 'sveltuse'

	const onLoadMore = async () => {
		// fetch more data
	}
</script>

<div class="relative w-[300px] m-auto">
	<div use:dInfiniteScroll={onLoadMore} />
</div>
