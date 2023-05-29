import type { Store } from 'sveltuse/types'
import type { Readable } from 'svelte/store'

import { onDestroy } from 'svelte'
import getStoreValue from '../getStoreValue'

type Watcher<T> = (newValue: T, oldValue: T) => void

type Stores = Readable<unknown> | Readable<unknown>[]

type StoresValues<T> = T extends Readable<infer U>
	? U
	: {
			[K in keyof T]: T[K] extends Readable<infer U> ? U : never
	  }

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
