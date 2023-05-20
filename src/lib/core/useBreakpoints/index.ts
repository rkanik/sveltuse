/* this implementation is original ported from https://vueuse.org/core/useBreakpoints */
import { writable, type Writable } from 'svelte/store'
import { defaultWindow, type ConfigurableWindow } from '../_configurable'

import { useMediaQuery } from '../useMediaQuery'
import { increaseWithUnit } from 'sveltuse/utils/increaseWithUnit'

export * from './breakpoints'

export type Breakpoints<K extends string = string> = Record<K, number | string>

export type BreakpointsStore<K extends string = string> = Writable<
	Record<K, boolean>
>

export type UseBreakpointsReturn<K extends string = string> = {
	smaller(k: K): Writable<boolean>
	isSmaller(k: K): boolean

	smallerOrEqual: (k: K) => Writable<boolean>
	isSmallerOrEqual(k: K): boolean

	between(a: K, b: K): Writable<boolean>
	isInBetween(a: K, b: K): boolean

	greater: (k: K) => Writable<boolean>
	isGreater(k: K): boolean

	greaterOrEqual: (k: K) => Writable<boolean>
	isGreaterOrEqual(k: K): boolean
	//
} & BreakpointsStore<K>

/**
 * Reactively viewport breakpoints
 *
 * @see https://sveltuse.pages.dev/docs/functions/useBreakpoints
 * @param options
 */
export function useBreakpoints<K extends string>(
	breakpoints: Breakpoints<K>,
	options: ConfigurableWindow = {}
): UseBreakpointsReturn<K> {
	const getValue = (k: K, delta?: number) => {
		let v = breakpoints[k]
		if (delta != null) v = increaseWithUnit(v, delta)
		if (typeof v === 'number') v = `${v}px`
		return v
	}

	const store = writable<Record<K, boolean>>(
		Object.keys(breakpoints).reduce((carry, k) => {
			carry[k as K] = false
			return carry
		}, {} as Record<K, boolean>)
	)

	Object.keys(breakpoints).forEach((k) => {
		const s = useMediaQuery(`(min-width: ${getValue(k as K)})`, options)
		s.subscribe((v) => {
			store.update((s) => {
				s[k as K] = v
				return s
			})
		})
	})

	const { window = defaultWindow } = options
	const match = (query: string): boolean => {
		if (!window) return false
		return window.matchMedia(query).matches
	}

	return {
		...store,

		// Smaller
		smaller(k: K) {
			return useMediaQuery(`(max-width: ${getValue(k, -0.1)})`, options)
		},
		isSmaller(k: K) {
			return match(`(max-width: ${getValue(k, -0.1)})`)
		},
		smallerOrEqual(k: K) {
			return useMediaQuery(`(max-width: ${getValue(k)})`, options)
		},
		isSmallerOrEqual(k: K) {
			return match(`(max-width: ${getValue(k)})`)
		},

		// Between
		between(a: K, b: K) {
			return useMediaQuery(
				`(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -0.1)})`,
				options
			)
		},
		isInBetween(a: K, b: K) {
			return match(
				`(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -0.1)})`
			)
		},

		// Greater
		greater(k: K) {
			return useMediaQuery(`(min-width: ${getValue(k, 0.1)})`, options)
		},
		isGreater(k: K) {
			return match(`(min-width: ${getValue(k, 0.1)})`)
		},
		greaterOrEqual(k: K) {
			return useMediaQuery(`(min-width: ${getValue(k)})`, options)
		},
		isGreaterOrEqual(k: K) {
			return match(`(min-width: ${getValue(k)})`)
		}
	}
}
