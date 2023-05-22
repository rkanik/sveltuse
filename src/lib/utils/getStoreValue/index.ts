import type { Store } from 'sveltuse/types'

export default function getStoreValue<T>(store: Store<T>): T {
	let value
	store.subscribe(($store) => {
		value = $store
	})()
	return value as T
}
