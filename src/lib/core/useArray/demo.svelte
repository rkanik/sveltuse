<script lang="ts">
	import Icon from '@iconify/svelte'
	import { Button, Spinner } from 'flowbite-svelte'
	import { useArray, type UseArrayItem } from 'sveltuse'
	import sleep from 'sveltuse/utils/sleep'

	type Item = {
		value: number
		isLoading: boolean
	}

	const initialItems: Item[] = [...Array(5).keys()].map((value) => ({
		value,
		isLoading: false
	}))

	const items = useArray(initialItems)

	const onUpdateItem = async (item: UseArrayItem<Item>) => {
		if (item._.isLoading) return

		item.update({ isLoading: true })
		await sleep(1000)

		item.update({
			value: Date.now(),
			isLoading: false
		})
	}
</script>

<div>
	<div class="flex items-center justify-between">
		<div class="text-lg font-medium">Items</div>
		<div class="mb-4 space-x-1">
			<Button
				outline
				size="xs"
				on:click={() => {
					items.push({
						value: Date.now(),
						isLoading: false
					})
				}}>
				Push
			</Button>
			<Button
				outline
				size="xs"
				on:click={() => {
					items.remove((item) => {
						return item.value % 2 !== 0
					})
				}}>
				Remove Odds
			</Button>
			<Button
				outline
				size="xs"
				on:click={() => {
					items.set(initialItems)
				}}>
				Reset
			</Button>
		</div>
	</div>
	<div class="flex flex-col space-y-2">
		{#each $items as item}
			<div class="bg-gray-700 pl-4 py-2 pr-2 flex items-center rounded">
				<div
					class="flex-1"
					on:click={() => {
						item.update({
							value: Date.now()
						})
					}}>
					{item._.value}
				</div>
				<Button
					class="!p-1 ml-auto"
					pill={true}
					outline={true}
					color="green"
					on:click={() => onUpdateItem(item)}>
					{#if item._.isLoading}
						<Spinner size="3.5" color="green" />
					{:else}
						<span class="inline-block w-3.5 h-3.5">
							<Icon icon="mdi-pencil-outline" />
						</span>
					{/if}
				</Button>
				<Button
					pill={true}
					outline={true}
					color="red"
					class="!p-1 ml-1"
					on:click={() => item.remove()}>
					<span class="inline-block w-3.5 h-3.5">
						<Icon icon="mdi-delete-outline" />
					</span>
				</Button>
			</div>
		{/each}
	</div>
</div>
