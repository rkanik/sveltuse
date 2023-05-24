<script lang="ts">
	import { useIntersectionObserver } from 'sveltuse'
</script>

<div>
	<div class="h-96 overflow-auto border-2 border-dashed border-white">
		<div class="h-[1000px] flex flex-col p-5">
			<div class="py-8 text-center text-xl italic">Scroll me down!</div>
			<div class="flex-1 flex justify-center items-center">
				<div
					class="h-16 flex items-center justify-center border-2 border-dashed border-green-400 text-green-300 w-full">
					Hello World!
				</div>
			</div>
		</div>
	</div>
</div>
