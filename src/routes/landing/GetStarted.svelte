<script>
	import { Button } from 'flowbite-svelte'

	import Icon from '@iconify/svelte'
	import Section from './utils/Section.svelte'
	import CopyCliboardInput from '../utils/CopyCliboardInput.svelte'
</script>

<Section tinted class="lg:py-24">
	<div class="flex flex-col items-center gap-4">
		<div class="flex flex-col flex-start gap-4">
			<h2
				class="tracking-tight text-3xl lg:text-4xl font-extrabold text-center text-gray-900 dark:text-white">
				Get started
			</h2>
			<p class="max-w-2xl text-lg text-center">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda,
				iusto id! Exercitationem totam adipisci non, laboriosam recusandae
				fuga hic? Fugiat quam sit soluta ad odit impedit voluptas numquam
				dolores laboriosam..
			</p>
		</div>
		<div class="mt-4 md:mt-5 sm:flex justify-center sm:justify-start1 w-full">
			<div
				class="flex flex-col sm:flex-row mx-0 gap-4 sm:gap-6 items-center max-w-2xl">
				<CopyCliboardInput class="bg-white md:!w-80" />
				<Button
					size="lg"
					class="gap-2 sm:max-w-sm w-full md:w-fit whitespace-nowrap hover:bg-primary-800"
					href="/core/useCounter"
					color="primary">
					See our docs <Icon class="text-xl" icon="mdi-arrow-right" />
				</Button>
			</div>
		</div>
	</div>
</Section>
