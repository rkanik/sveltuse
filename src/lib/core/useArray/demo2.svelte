<script lang="ts">
	import { useArray } from 'sveltuse'

	const items = useArray([1, 2, 3])

	// Array methods
	items.push(4) // [1, 2, 3, 4]
	items.unshift(0) // [0, 1, 2, 3, 4]

	items.remove((item) => item % 2 === 1) // [0, 2, 4]
	items.removeByIndex(0) // [2, 4]

	items.get() // [2, 4]
	items.set([1, 2, 3, 4]) // [1, 2, 3, 4]
	items.update((v) => v.map((i) => i + 1)) // [2, 3, 4, 5]

	// Item methods
	$items[0].set(10) // [10, 3, 4, 5]
	$items[0].update(20) // [20, 3, 4, 5]
	$items[0].remove() // [3, 4, 5]
</script>

<pre><code>{JSON.stringify($items, null, 2)}</code></pre>
