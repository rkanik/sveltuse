<script lang="ts">
	import { Button } from 'flowbite-svelte'
	import { useContext } from 'sveltuse'
	const time = useContext<Date>('time')
</script>

<div>
	<div class="text-left">
		<div>Now: {$time?.getTime()}</div>
		<div>Datetime: {$time}</div>
	</div>

	<div class="mt-4">
		<Button on:click={() => time.set(new Date())}>Click me</Button>
	</div>
</div>
