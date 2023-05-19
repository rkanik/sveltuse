import { onMount } from 'svelte'
import { writable } from 'svelte/store'

export function useMounted() {
	let isMounted = writable(false)

	onMount(() => {
		isMounted.set(true)
	})

	return isMounted
}
