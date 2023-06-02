<script lang="ts">
	import { Button } from 'flowbite-svelte'
	import { useDarkReader } from 'sveltuse/integrations/useDarkReader'

	const darkReader = useDarkReader()
</script>

<div>
	<Button on:click={() => darkReader.toggle()}>Toggle</Button>
	<Button on:click={() => darkReader.toggle(true)}>Turn On</Button>
	<Button on:click={() => darkReader.toggle(false)}>Turn Off</Button>
</div>
