<script lang="ts">
	import Icon from '@iconify/svelte'
	import classNames from 'classnames'
	// import { onMount } from 'svelte'
	// import { page } from '$app/stores'
	import { Tooltip } from 'flowbite-svelte'
	import { useClipboard } from 'sveltuse'

	export let src: any = undefined
	export let meta: {
		Wrapper: string
		example: true
		hideCode: boolean
	}

	$: src, meta

	let code: HTMLPreElement

	// const gitHub = new URL(
	// 	'https://github.com/rkanik/sveltuse/blob/main/src/routes/'
	// )

	// let path: URL

	// suppress vite-plugin-svelte warning about unused props

	let expand: boolean = false
	let showExpandButton: boolean = false
	// let dark: boolean = false

	function checkOverflow(el: HTMLElement) {
		const isOverflowingY = el.clientHeight < el.scrollHeight
		showExpandButton = isOverflowingY
		el.firstElementChild?.classList.add('-mb-8')
	}

	const { isSupported, copied, copy } = useClipboard()
	const onClickCopy = () => {
		const REG_HEX = /&#x([a-fA-F0-9]+);/g
		copy(
			code.innerText.replace(REG_HEX, function (_match, group1) {
				const num = parseInt(group1, 16)
				return String.fromCharCode(num)
			})
		)
	}

	// onMount(() => {
	// 	console.log('Example', { code })
	// })
</script>

<div class="mt-8 code-example">
	<!-- {#if !meta.hideOutput} -->
	<!-- <div
		class="w-full p-4 border border-gray-200 bg-gray-50 rounded-t-xl dark:border-gray-600 dark:bg-gray-700">
		<div class="grid grid-cols-2">
			{#if path}
				<Button
					size="xs"
					color="alternative"
					class="dark:!bg-gray-900 w-fit hover:text-primary-600 gap-2"
					href={'' + path}
					target="_blank"
					rel="noreferrer">
					<GitHub size="sm" />Edit on GitHub
				</Button>
			{/if}
			<div class="ml-auto">
				<ExampleDarkMode on:click={() => (dark = !dark)} {dark} />
			</div>
		</div>
	</div>

	<div class="code-preview-wrapper">
		<div
			class="flex p-0 bg-white border-gray-200 bg-gradient-to-r code-preview dark:bg-gray-900 border-x dark:border-gray-600"
			class:dark>
			<div class="w-full code-responsive-wrapper">
				<div class={classNames(divClass, meta.class)}>
					<slot name="example" />
				</div>
			</div>
		</div>
	</div> -->
	<!-- {/if} -->

	<div class="code-preview-wrapper">
		<div
			class={classNames(
				'flex p-0 bg-white border-gray-200 bg-gradient-to-r code-preview dark:bg-gray-900 border-x border-t rounded-t overflow-hidden dark:border-gray-600',
				{
					'border-b': meta.hideCode
				}
			)}>
			<div class="w-full code-responsive-wrapper">
				<div
					class="w-full mx-auto bg-gradient-to-r bg-white dark:bg-gray-900 p-2 sm:p-6">
					<slot name="example" />
				</div>
			</div>
		</div>
	</div>

	{#if !meta.hideCode}
		<div class="code-syntax-wrapper">
			<div
				class="relative border-gray-200 border-y border-x code-syntax dark:border-gray-600">
				<div
					class="grid w-full grid-cols-2 border-b border-gray-200 bg-gray-50 rounded-t-md dark:bg-gray-700 dark:border-gray-600">
					<ul
						class="flex text-sm font-medium text-center text-gray-500 dark:text-gray-400">
						<li>
							<span
								class="inline-block w-full p-2 px-3 text-gray-800 bg-gray-100 border-r border-gray-200 dark:text-white dark:bg-gray-800 dark:border-gray-600">
								Svelte
							</span>
						</li>
					</ul>
					<div class="flex justify-end">
						{#if $isSupported}
							<button
								on:click={onClickCopy}
								type="button"
								class="flex items-center px-3 py-2 text-sm font-medium bg-gray-100 border-l border-gray-200 dark:border-gray-600 dark:bg-gray-800 copy-to-clipboard-button space-x-1 {$copied
									? 'text-primary-500'
									: 'text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-white'}">
								<Icon icon="mdi-content-copy" />
								<span>{$copied ? 'Copied' : 'Copy'}</span>
							</button>
							<Tooltip placement="bottom-end"
								>Copy to clipboard.</Tooltip>
						{/if}
					</div>
				</div>
				<div class="relative">
					<div
						tabindex="-1"
						class="overflow-hidden"
						class:max-h-72={!expand}
						use:checkOverflow>
						<div class="highlight">
							<pre bind:this={code} class="language-svelte !-mt-2"><slot
									name="code" /></pre>
						</div>
					</div>
					{#if showExpandButton && !expand}
						<button
							on:click={() => (expand = !expand)}
							type="button"
							data-expand-code=""
							class="absolute bottom-0 left-0 py-2.5 px-5 w-full text-sm font-medium text-gray-900 bg-gray-100 border-t border-gray-200 hover:bg-gray-100 hover:text-primary-700 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
							Expand code
						</button>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
