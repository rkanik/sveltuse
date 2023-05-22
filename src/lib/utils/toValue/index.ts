import type { AnyFn, MaybeGetter, Store } from 'sveltuse/types'
import getStoreValue from '../getStoreValue'

/**
 * Get the value of value/writable/readable/getter.
 */
export default function toValue<T>(r: MaybeGetter<T>): T {
	if (typeof r === 'function') {
		return (r as AnyFn)()
	}

	if (typeof r === 'object' && r !== null && 'subscribe' in r) {
		return getStoreValue(r as Store<T>)
	}

	return r
}
