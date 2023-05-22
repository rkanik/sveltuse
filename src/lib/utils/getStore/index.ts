import type { AnyFn, MaybeGetter, Store } from 'sveltuse/types'

export default function getStore<T>(v: MaybeGetter<T>): Store<T> | null {
	const store: T | Store<T> = typeof v === 'function' ? (v as AnyFn)() : v

	if (!!store && typeof store === 'object' && 'subscribe' in store) {
		return store
	}

	return null
}
