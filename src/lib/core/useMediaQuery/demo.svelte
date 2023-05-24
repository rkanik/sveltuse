<script lang="ts">
	import { useMediaQuery } from 'sveltuse'

	const isLargeScreen = useMediaQuery('(min-width: 1024px)')
	const isPreferredDark = useMediaQuery('(prefers-color-scheme: dark)')
</script>

<div>
	<div>isLargeScreen: {$isLargeScreen}</div>
	<div>prefersDark: {$isPreferredDark}</div>
</div>
