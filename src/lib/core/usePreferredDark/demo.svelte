<script lang="ts">
	import { usePreferredDark } from 'sveltuse'

	const prefersDark = usePreferredDark()
</script>

<div>
	<note class="mb-2">
		Prefers Dark: <span
			class="font-bold {$prefersDark ? 'text-green-500' : 'text-red-500'}">
			{$prefersDark ? 'true' : 'false'}
		</span>
	</note>
</div>
