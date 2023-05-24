<script lang="ts">
	import type { Writable } from 'svelte/store'

	import Icon from '@iconify/svelte'

	import { page } from '$app/stores'
	import { getContext } from 'svelte'
	import { afterNavigate } from '$app/navigation'
	import {
		Sidebar,
		SidebarItem,
		SidebarGroup,
		SidebarWrapper,
		SidebarDropdownWrapper,
		Button
	} from 'flowbite-svelte'

	export let data

	const drawerHidden: Writable<boolean> = getContext('drawer')
	const closeDrawer = () => {
		drawerHidden.set(true)
	}

	const getDropdowns = () => {
		return data.postGroups.reduce(
			(dropdowns, group) => ({
				...dropdowns,
				[group.label]: group.items.some((item) => {
					return $page.url.pathname.startsWith(item.href)
				})
			}),
			{} as { [label: string]: boolean }
		)
	}

	let dropdowns = getDropdowns()

	afterNavigate((navigation) => {
		document.getElementById('svelte')?.scrollTo({ top: 0 })
		closeDrawer()

		dropdowns = getDropdowns()

		// const pathname = navigation.to?.url.pathname ?? ''

		// const key = fileDir(activeUrl)
		// for (const k in dropdowns) dropdowns[k] = false
		// dropdowns[key] = true
	})
</script>

<Sidebar
	class={$drawerHidden && 'hidden'}
	asideClass="fixed inset-0 z-30 flex-none h-full w-64 lg:static lg:h-auto border-r border-gray-200 dark:border-gray-600 lg:overflow-y-visible lg:pt-0 lg:block">
	<h4 id="sidebar-label" class="sr-only">Browse docs</h4>
	<SidebarWrapper
		divClass="overflow-y-auto px-4 pt-20 lg:pt-0 h-full bg-white scrolling-touch max-w-2xs lg:h-[calc(100vh-8rem)] lg:block dark:bg-gray-900 lg:mr-0 lg:sticky top-20">
		<nav class="font-normal text-base lg:text-sm">
			<SidebarGroup ulClass="list-unstyled fw-normal small mb-4">
				{#each data.postGroups as group}
					<SidebarDropdownWrapper
						bind:isOpen={dropdowns[group.label]}
						label={group.label}
						spanClass=""
						ulClass="space-y-2.5"
						btnClass="flex items-center justify-between w-full my-4 text-sm font-semibold tracking-wide uppercase hover:text-primary-700 dark:hover:text-primary-600"
						class={dropdowns[group.label]
							? 'text-primary-700 dark:text-primary-700'
							: 'text-gray-900 dark:text-white'}>
						<Icon
							slot="arrowdown"
							icon="mdi-chevron-right"
							class="text-2xl" />

						<Icon
							slot="arrowup"
							icon="mdi-chevron-down"
							class="text-2xl" />

						{#each group.items as item}
							<SidebarItem
								href={item.href}
								label={item.hrefText || item.title}
								active={$page.url.pathname.startsWith(item.href)}
								spanClass=""
								aClass="transition-colors duration-200 relative flex items-center flex-wrap font-medium hover:text-gray-900 hover:cursor-pointer text-gray-500 dark:text-gray-400 dark:hover:text-white"
								activeClass="relative flex items-center flex-wrap font-medium cursor-default text-primary-700 dark:text-primary-700" />
						{/each}
					</SidebarDropdownWrapper>
				{/each}
			</SidebarGroup>
		</nav>
	</SidebarWrapper>
</Sidebar>

<div
	hidden={$drawerHidden}
	class="fixed inset-0 z-20 bg-gray-900/50 dark:bg-gray-900/60"
	on:click={closeDrawer}
	on:keydown={closeDrawer} />

<main
	class="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
	<slot />
</main>

{#if import.meta.env.DEV}
	<Button
		href={$page.url.pathname.endsWith('/demo')
			? $page.url.pathname.replace('/demo', '')
			: $page.url.pathname + '/demo'}
		pill
		class="fixed bottom-4 right-8 !p-3"
		><Icon
			class="text-2xl"
			icon={$page.url.pathname.endsWith('/demo')
				? 'bx:book'
				: 'gg:debug'} /></Button>
{/if}
