<script lang="ts">
	import { Card } from 'flowbite-svelte'
	export let data
</script>

<Card size="xl" class="">
	<svelte:component this={data.component} />
</Card>
