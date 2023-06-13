import { onMount } from 'svelte'
import { writable } from 'svelte/store'

export function useMounted() {
	const isMounted = writable(false)

	onMount(() => {
		isMounted.set(true)
	})

	return isMounted
}
