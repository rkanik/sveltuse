import type { Fn } from 'sveltuse/types'
import type { ConfigurableWindow } from '../_configurable'

import { noop } from 'svelte/internal'
import { defaultWindow } from 'sveltuse/constants'
import { useEventListener } from '../useEventListener'
import { isIOS } from 'sveltuse/utils/isIOS'

export interface UseClickOutsideOptions extends ConfigurableWindow {
	/**
	 * List of elements that should not trigger the event.
	 */
	ignore?: (string | (() => HTMLElement))[]
	/**
	 * Use capturing phase for internal event listener.
	 * @default true
	 */
	capture?: boolean
	/**
	 * Run handler function if focus moves to an iframe.
	 * @default false
	 */
	detectIframe?: boolean
}

export type UseClickOutsideHandler<
	T extends { detectIframe: UseClickOutsideOptions['detectIframe'] } = {
		detectIframe: false
	}
> = (
	evt: T['detectIframe'] extends true
		? PointerEvent | FocusEvent
		: PointerEvent
) => void

let _iOSWorkaround = false

/**
 * Listen for clicks outside of an element.
 *
 * @see https://vueuse.org/useClickOutside
 * @param target
 * @param handler
 * @param options
 */
export function useClickOutside<T extends UseClickOutsideOptions>(
	target: () => HTMLElement,
	handler: UseClickOutsideHandler<{ detectIframe: T['detectIframe'] }>,
	options: T = {} as T
) {
	const {
		window = defaultWindow,
		ignore = [],
		capture = true,
		detectIframe = false
	} = options

	if (!window) return

	// Fixes: https://github.com/vueuse/vueuse/issues/1520
	// How it works: https://stackoverflow.com/a/39712411
	if (isIOS() && !_iOSWorkaround) {
		_iOSWorkaround = true
		Array.from(window.document.body.children).forEach((el) =>
			el.addEventListener('click', noop)
		)
	}

	let shouldListen = true

	const shouldIgnore = (event: PointerEvent) => {
		return ignore.some((target) => {
			if (typeof target === 'string') {
				return Array.from(window.document.querySelectorAll(target)).some(
					(el) => el === event.target || event.composedPath().includes(el)
				)
			}

			if (typeof target === 'function') {
				const el = target()
				return el === event.target || event.composedPath().includes(el)
			}

			//  else {
			// 	const el = unrefElement(target)
			// 	return (
			// 		el && (event.target === el || event.composedPath().includes(el))
			// 	)
			// }
		})
	}

	const listener = (event: PointerEvent) => {
		// const el = unrefElement(target)
		const el = target()

		if (!el || el === event.target || event.composedPath().includes(el))
			return

		if (event.detail === 0) shouldListen = !shouldIgnore(event)

		if (!shouldListen) {
			shouldListen = true
			return
		}

		handler(event)
	}

	const cleanup = [
		useEventListener(window, 'click', listener, { passive: true, capture }),
		useEventListener(
			window,
			'pointerdown',
			(e) => {
				const el = target()
				// const el = unrefElement(target)
				if (el)
					shouldListen = !e.composedPath().includes(el) && !shouldIgnore(e)
			},
			{ passive: true }
		),
		detectIframe &&
			useEventListener(window, 'blur', (event) => {
				setTimeout(() => {
					const el = target()
					// const el = unrefElement(target)
					if (
						window.document.activeElement?.tagName === 'IFRAME' &&
						!el?.contains(window.document.activeElement)
					)
						handler(event as any)
				}, 0)
			})
	].filter(Boolean) as Fn[]

	const stop = () => cleanup.forEach((fn) => fn())

	return stop
}
