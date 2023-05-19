import { writable } from 'svelte/store'

export interface UseCounterOptions {
	min?: number
	max?: number
}
/**
 * Basic counter with utility functions.
 *
 * @see https://sveltuse.pages.dev/docs/functions/useCounter
 * @param [initialValue=0]
 * @param {Object} options
 */
export function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
	const count = writable(initialValue)

	const { max = Infinity, min = -Infinity } = options

	const inc = (delta = 1) => {
		count.update((count) => {
			return Math.min(max, count + delta)
		})
	}

	const dec = (delta = 1) => {
		count.update((count) => {
			return Math.max(min, count - delta)
		})
	}

	const set = (val: number) => {
		count.update(() => {
			return Math.max(min, Math.min(max, val))
		})
	}

	const reset = (val = initialValue) => {
		initialValue = val
		return set(val)
	}

	return { count, inc, dec, set, reset }
}
