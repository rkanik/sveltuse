<script lang="ts">
	import { breakpointsTailwind, useBreakpoints } from 'sveltuse'

	const breakpoints = useBreakpoints(breakpointsTailwind)

	const mdAndDown = breakpoints.smaller('lg')
	const lgAndDown = breakpoints.smallerOrEqual('lg')

	const betweenSmAndMd = breakpoints.between('sm', 'lg')

	const lgAndUp = breakpoints.greater('md')
	const mdAndUp = breakpoints.greaterOrEqual('md')
</script>

<div class="flex space-x-4">
	<div class="flex-1">
		<div>
			Raw:
			<pre><code lang="json"
					>{JSON.stringify($breakpoints, null, 2)}</code></pre>
		</div>

		<div />
		<div>mdAndDown: {$mdAndDown}</div>
		<div>lgAndDown: {$lgAndDown}</div>
		<div>betweenSmAndMd: {$betweenSmAndMd}</div>
		<div>lgAndUp: {$lgAndUp}</div>
		<div>mdAndUp: {$mdAndUp}</div>
	</div>
	<div class="flex-none">
		breakpointsTailwind:
		<pre><code lang="json"
				>{JSON.stringify(breakpointsTailwind, null, 2)}</code></pre>
	</div>
</div>
