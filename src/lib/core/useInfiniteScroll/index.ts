// Ported from https://vueuse.org/useInfiniteScroll

import type { UseScrollOptions } from '../useScroll'
import type { Awaitable, MaybeGetter } from 'sveltuse/types'

import { writable } from 'svelte/store'
import { useScroll } from '../useScroll'

import sleep from 'sveltuse/utils/sleep'
import watch from 'sveltuse/utils/watch'
import toValue from 'sveltuse/utils/toValue'
import getStoreValue from 'sveltuse/utils/getStoreValue'

export interface UseInfiniteScrollOptions extends UseScrollOptions {
	/**
	 * The minimum distance between the bottom of the element and the bottom of the viewport
	 *
	 * @default 0
	 */
	distance?: number

	/**
	 * The direction in which to listen the scroll.
	 *
	 * @default 'bottom'
	 */
	direction?: 'top' | 'bottom' | 'left' | 'right'

	/**
	 * The interval time between two load more (to avoid too many invokes).
	 *
	 * @default 100
	 */
	interval?: number
}

/**
 * Reactive infinite scroll.
 *
 * @see https://sveltuse.pages.dev/useInfiniteScroll
 */
export function useInfiniteScroll(
	element: MaybeGetter<EventTarget>,
	onLoadMore: (state: ReturnType<typeof useScroll>) => Awaitable<void>,
	options: UseInfiniteScrollOptions = {}
) {
	const { direction = 'bottom', interval = 100 } = options

	const state = useScroll(element as any, {
		...options,
		offset: {
			[direction]: options.distance ?? 0,
			...options.offset
		}
	})

	const isLoading = writable(false)

	const checkAndLoad = async () => {
		if (toValue(isLoading)) return

		state.measure()

		const el = toValue(element) as HTMLElement
		if (!el) return

		const isNarrower =
			direction === 'bottom' || direction === 'top'
				? el.scrollHeight <= el.clientHeight
				: el.scrollWidth <= el.clientWidth

		const arrivedState = getStoreValue(state.arrivedState)
		if (arrivedState[direction] || isNarrower) {
			isLoading.set(true)
			await Promise.all([onLoadMore(state), sleep(interval)])
			isLoading.set(false)
		}
	}

	watch(state.arrivedState, (v) => {
		if (v[direction]) checkAndLoad()
	})

	return {
		isLoading
	}
}
