<script lang="ts">
	export let value = false
	export let truthy = 'true'
	export let falsy = 'false'
	export let trueClass = 'text-primary-500'
	export let falseClass = 'text-orange-400 dark:text-orange-300'
</script>

<span class={value ? trueClass : falseClass}>
	{value ? truthy : falsy}
</span>
