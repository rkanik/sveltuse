import type { Store } from 'sveltuse/types'

import { onDestroy } from 'svelte'
import getStoreValue from '../getStoreValue'

type Watcher<T> = (newValue: T, oldValue: T) => void

export default function watch<T>(store: Store<T>, watcher: Watcher<T>) {
	let oldValue = getStoreValue(store)

	const unsubscribe = store.subscribe((newValue) => {
		if (oldValue != newValue) {
			watcher(newValue, oldValue)
			oldValue = newValue
		}
	})

	onDestroy(unsubscribe)
	return unsubscribe
}
