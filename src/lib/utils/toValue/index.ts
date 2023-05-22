import type { AnyFn, MaybeGetter } from 'sveltuse/types'

/**
 * Get the value of value/ref/getter.
 */
export function toValue<T>(r: MaybeGetter<T>): T {
	return typeof r === 'function' ? (r as AnyFn)() : r
}
