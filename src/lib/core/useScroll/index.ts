// Ported from https://vueuse.org/useScroll
import type { MaybeGetter } from 'sveltuse/types'

import toValue from 'sveltuse/utils/toValue'
import computed from 'sveltuse/utils/computed'
import anonymous from 'sveltuse/utils/anonymous'

import { writable } from 'svelte/store'
import { useThrottleFn } from '../useThrottleFn'
import { useDebounceFn } from '../useDebounceFn'
import { useEventListener } from '../useEventListener'

type BooleanPositions = {
	left: boolean
	right: boolean
	top: boolean
	bottom: boolean
}

const newBooleanPositions = (v: Partial<BooleanPositions> = {}) => ({
	left: false,
	right: false,
	top: false,
	bottom: false,
	...v
})

export interface UseScrollOptions {
	/**
	 * Throttle time for scroll event, it’s disabled by default.
	 *
	 * @default 0
	 */
	throttle?: number

	/**
	 * The check time when scrolling ends.
	 * This configuration will be setting to (throttle + idle) when the `throttle` is configured.
	 *
	 * @default 200
	 */
	idle?: number

	/**
	 * Offset arrived states by x pixels
	 *
	 */
	offset?: {
		left?: number
		right?: number
		top?: number
		bottom?: number
	}

	/**
	 * Trigger it when scrolling.
	 *
	 */
	onScroll?: (e: Event) => void

	/**
	 * Trigger it when scrolling ends.
	 *
	 */
	onStop?: (e: Event) => void

	/**
	 * Listener options for scroll event.
	 *
	 * @default {capture: false, passive: true}
	 */
	eventListenerOptions?: boolean | AddEventListenerOptions

	/**
	 * Optionally specify a scroll behavior of `auto` (default, not smooth scrolling) or
	 * `smooth` (for smooth scrolling) which takes effect when changing the `x` or `y` refs.
	 *
	 * @default 'auto'
	 */
	behavior?: MaybeGetter<ScrollBehavior>
}

/**
 * We have to check if the scroll amount is close enough to some threshold in order to
 * more accurately calculate arrivedState. This is because scrollTop/scrollLeft are non-rounded
 * numbers, while scrollHeight/scrollWidth and clientHeight/clientWidth are rounded.
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#determine_if_an_element_has_been_totally_scrolled
 */
const ARRIVED_STATE_THRESHOLD_PIXELS = 1

/**
 * Reactive scroll.
 *
 * @see https://sveltuse.pages.dev/core/useScroll
 * @param element
 * @param options
 */

export function useScroll(
	element: MaybeGetter<
		HTMLElement | SVGElement | Window | Document | null | undefined
	>,
	options: UseScrollOptions = {}
) {
	const {
		throttle = 0,
		idle = 200,
		onStop = anonymous,
		onScroll = anonymous,
		offset = {
			left: 0,
			right: 0,
			top: 0,
			bottom: 0
		},
		eventListenerOptions = {
			capture: false,
			passive: true
		},
		behavior = 'auto'
	} = options

	const internalX = writable(0)
	const internalY = writable(0)

	function scrollTo(_x: number | undefined, _y: number | undefined) {
		const _element = toValue(element)

		if (!_element) return
		;(_element instanceof Document ? document.body : _element)?.scrollTo({
			top: toValue(_y) ?? toValue(internalY),
			left: toValue(_x) ?? toValue(internalX),
			behavior: toValue(behavior)
		})
	}

	const isScrolling = writable(false)
	const arrivedState = writable(newBooleanPositions({ left: true, top: true }))
	const directions = writable(newBooleanPositions())

	const onScrollEnd = (e: Event) => {
		// dedupe if support native scrollend event
		if (!toValue(isScrolling)) return

		isScrolling.set(false)
		directions.update(() => newBooleanPositions())

		onStop(e)
	}
	const onScrollEndDebounced = useDebounceFn(onScrollEnd, throttle + idle)

	const setArrivedState = (
		target: HTMLElement | SVGElement | Window | Document | null | undefined
	) => {
		const el = (
			target === window
				? (target as Window).document.documentElement
				: target === document
				? (target as Document).documentElement
				: target
		) as HTMLElement

		const { display, flexDirection } = getComputedStyle(el)

		const scrollLeft = el.scrollLeft

		directions.update((v) => ({
			...v,
			left: scrollLeft < toValue(internalX),
			right: scrollLeft > toValue(internalX)
		}))

		const left = Math.abs(scrollLeft) <= 0 + (offset.left || 0)
		const right =
			Math.abs(scrollLeft) + el.clientWidth >=
			el.scrollWidth - (offset.right || 0) - ARRIVED_STATE_THRESHOLD_PIXELS

		if (display === 'flex' && flexDirection === 'row-reverse') {
			arrivedState.update((v) => ({ ...v, left: right, right: left }))
		} else {
			arrivedState.update((v) => ({ ...v, left, right }))
		}

		internalX.set(scrollLeft)

		let scrollTop = el.scrollTop

		// patch for mobile compatible
		if (target === document && !scrollTop) scrollTop = document.body.scrollTop

		directions.update((v) => ({
			...v,
			top: scrollTop < toValue(internalY),
			bottom: scrollTop > toValue(internalY)
		}))

		const top = Math.abs(scrollTop) <= 0 + (offset.top || 0)
		const bottom =
			Math.abs(scrollTop) + el.clientHeight >=
			el.scrollHeight - (offset.bottom || 0) - ARRIVED_STATE_THRESHOLD_PIXELS

		/**
		 * reverse columns and rows behave exactly the other way around,
		 * bottom is treated as top and top is treated as the negative version of bottom
		 */
		if (display === 'flex' && flexDirection === 'column-reverse') {
			arrivedState.update((v) => ({ ...v, top: bottom, bottom: top }))
		} else {
			arrivedState.update((v) => ({ ...v, top, bottom }))
		}

		internalY.set(scrollTop)
	}

	const onScrollHandler = (e: Event) => {
		const eventTarget = (
			e.target === document
				? (e.target as Document).documentElement
				: e.target
		) as HTMLElement

		setArrivedState(eventTarget)

		isScrolling.set(true)
		onScrollEndDebounced(e)
		onScroll(e)
	}

	useEventListener(
		element,
		'scroll',
		throttle
			? useThrottleFn(onScrollHandler, throttle, true, false)
			: onScrollHandler,
		eventListenerOptions
	)

	useEventListener(element, 'scrollend', onScrollEnd, eventListenerOptions)

	const x = computed(internalX, {
		get: ($x) => $x,
		set(value, store) {
			scrollTo(value, undefined)
			store.set(value)
		},
		update(updater, store, value) {
			scrollTo(value, undefined)
			store.update(updater)
		}
	})

	const y = computed(internalY, {
		get: ($y) => $y,
		set(value, store) {
			scrollTo(undefined, value)
			store.set(value)
		},
		update(updater, store, value) {
			scrollTo(undefined, value)
			store.update(updater)
		}
	})

	return {
		x,
		y,
		isScrolling,
		arrivedState,
		directions,
		measure() {
			const _element = toValue(element)

			if (_element) setArrivedState(_element)
		}
	}
}

export type UseScrollReturn = ReturnType<typeof useScroll>
