// Ported from https://vueuse.org/core/useMouse

import type { ConfigurableWindow } from '../_configurable'
import type {
	Position,
	MaybeGetter,
	ConfigurableEventFilter
} from 'sveltuse/types'

import { writable } from 'svelte/store'
import { defaultWindow } from 'sveltuse/constants'
import { useEventListener } from '../useEventListener'

export type UseMouseSourceType = 'mouse' | 'touch' | null
export type UseMouseCoordType = 'page' | 'client' | 'screen' | 'movement'
export type UseMouseEventExtractor = (
	event: MouseEvent | Touch
) => [x: number, y: number] | null | undefined

export interface UseMouseOptions
	extends ConfigurableWindow,
		ConfigurableEventFilter {
	/**
	 * Mouse position based by page, client, screen, or relative to previous position
	 *
	 * @default 'page'
	 */
	type?: UseMouseCoordType | UseMouseEventExtractor

	/**
	 * Listen events on `target` element
	 *
	 * @default 'Window'
	 */
	target?: MaybeGetter<Window | EventTarget | null | undefined>

	/**
	 * Listen to `touchmove` events
	 *
	 * @default true
	 */
	touch?: boolean

	/**
	 * Reset to initial value when `touchend` event fired
	 *
	 * @default false
	 */
	resetOnTouchEnds?: boolean

	/**
	 * Initial values
	 */
	initialValue?: Position
}

const BuiltinExtractors: Record<UseMouseCoordType, UseMouseEventExtractor> = {
	page: (event) => [event.pageX, event.pageY],
	client: (event) => [event.clientX, event.clientY],
	screen: (event) => [event.screenX, event.screenY],
	movement: (event) =>
		event instanceof Touch ? null : [event.movementX, event.movementY]
} as const

/**
 * Reactive mouse position.
 *
 * @see https://sveltuse.pages.dev/core/useMouse
 * @param options
 */
export function useMouse(options: UseMouseOptions = {}) {
	const {
		type = 'page',
		touch = true,
		resetOnTouchEnds = false,
		initialValue = { x: 0, y: 0 },
		window = defaultWindow,
		target = window,
		eventFilter
	} = options

	const x = writable(initialValue.x)
	const y = writable(initialValue.y)
	const sourceType = writable<UseMouseSourceType>(null)

	const extractor = typeof type === 'function' ? type : BuiltinExtractors[type]

	const mouseHandler = (event: MouseEvent) => {
		const result = extractor(event)

		if (result) {
			x.set(result[0])
			y.set(result[1])
			sourceType.set('mouse')
		}
	}

	const touchHandler = (event: TouchEvent) => {
		if (event.touches.length > 0) {
			const result = extractor(event.touches[0])
			if (result) {
				x.set(result[0])
				y.set(result[1])
				sourceType.set('touch')
			}
		}
	}

	const reset = () => {
		x.set(initialValue.x)
		y.set(initialValue.y)
	}

	const mouseHandlerWrapper = eventFilter
		? (event: MouseEvent) => eventFilter(() => mouseHandler(event), {} as any)
		: (event: MouseEvent) => mouseHandler(event)

	const touchHandlerWrapper = eventFilter
		? (event: TouchEvent) => eventFilter(() => touchHandler(event), {} as any)
		: (event: TouchEvent) => touchHandler(event)

	if (target) {
		useEventListener(target, 'mousemove', mouseHandlerWrapper, {
			passive: true
		})
		useEventListener(target, 'dragover', mouseHandlerWrapper, {
			passive: true
		})
		if (touch && type !== 'movement') {
			useEventListener(target, 'touchstart', touchHandlerWrapper, {
				passive: true
			})
			useEventListener(target, 'touchmove', touchHandlerWrapper, {
				passive: true
			})
			if (resetOnTouchEnds)
				useEventListener(target, 'touchend', reset, { passive: true })
		}
	}

	return {
		x,
		y,
		sourceType
	}
}

export type UseMouseReturn = ReturnType<typeof useMouse>
