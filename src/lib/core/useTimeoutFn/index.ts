import type { AnyFn, MaybeGetter, Stoppable } from 'sveltuse/types'

import toValue from 'sveltuse/utils/toValue'

import { onDestroy } from 'svelte'
import { isClient } from 'sveltuse/constants'
import { derived, writable } from 'svelte/store'

export interface UseTimeoutFnOptions {
	/**
	 * Start the timer immediate after calling this function
	 *
	 * @default true
	 */
	immediate?: boolean
}

/**
 * Wrapper for `setTimeout` with controls.
 *
 * @param cb
 * @param interval
 * @param options
 */
export function useTimeoutFn<CallbackFn extends AnyFn>(
	cb: CallbackFn,
	interval: MaybeGetter<number>,
	options: UseTimeoutFnOptions = {}
): Stoppable<Parameters<CallbackFn> | []> {
	const { immediate = true } = options

	const isPending = writable(false)

	let timer: ReturnType<typeof setTimeout> | null = null

	function clear() {
		if (timer) {
			clearTimeout(timer)
			timer = null
		}
	}

	function stop() {
		isPending.set(false)
		clear()
	}

	function start(...args: Parameters<CallbackFn> | []) {
		clear()
		isPending.set(true)
		timer = setTimeout(() => {
			isPending.set(false)
			timer = null

			cb(...args)
		}, toValue(interval))
	}

	if (immediate) {
		isPending.set(true)
		if (isClient) start()
	}

	onDestroy(() => {
		stop()
	})

	return {
		isPending: derived(isPending, (v) => v),
		start,
		stop
	}
}
