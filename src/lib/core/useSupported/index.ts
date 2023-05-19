import { derived } from 'svelte/store'
import { useMounted } from '../useMounted'

export function useSupported(callback: () => unknown) {
	const isMounted = useMounted()
	return derived(isMounted, () => {
		return Boolean(callback())
	})
}
