<script>
	import { page } from '$app/stores'
	import { Button } from 'flowbite-svelte'
</script>

<!-- <h1>{$page.error?.message ?? 'Unknow error'}</h1> -->

<div class="flex-1 py-40 flex justify-center items-center flex-col">
	<div class="text-7xl font-bold">404</div>
	<h1 class="text-lg font-bold mt-2 tracking-wider">PAGE NOT FOUND</h1>
	<div class="max-w-md text-center mt-2">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ducimus
		optio quibusdam sequi praesentium dolore similique ea. Ratione, modi
		beatae, consequuntur adipisci
	</div>
	<div>
		<Button pill outline href="/" class="mt-4">Take me home</Button>
	</div>
</div>
