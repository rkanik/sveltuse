// Ported from https://vueuse.org/core/useResizeObserver

import type { MaybeGetter } from 'sveltuse/types'
import type { ConfigurableWindow } from '../_configurable'
import { defaultWindow } from 'sveltuse/constants'
import { useIsSupported } from '../useIsSupported'
import { onDestroy } from 'svelte'
import toValue from 'sveltuse/utils/toValue'

export interface ResizeObserverSize {
	readonly inlineSize: number
	readonly blockSize: number
}

export interface ResizeObserverEntry {
	readonly target: Element
	readonly contentRect: DOMRectReadOnly
	readonly borderBoxSize?: ReadonlyArray<ResizeObserverSize>
	readonly contentBoxSize?: ReadonlyArray<ResizeObserverSize>
	readonly devicePixelContentBoxSize?: ReadonlyArray<ResizeObserverSize>
}

export type ResizeObserverCallback = (
	entries: ReadonlyArray<ResizeObserverEntry>,
	observer: ResizeObserver
) => void

export interface UseResizeObserverOptions extends ConfigurableWindow {
	/**
	 * Sets which box model the observer will observe changes to. Possible values
	 * are `content-box` (the default), `border-box` and `device-pixel-content-box`.
	 *
	 * @default 'content-box'
	 */
	box?: ResizeObserverBoxOptions
}

declare class ResizeObserver {
	constructor(callback: ResizeObserverCallback)
	disconnect(): void
	observe(target: Element, options?: UseResizeObserverOptions): void
	unobserve(target: Element): void
}

/**
 * Reports changes to the dimensions of an Element's content or the border-box
 *
 * @see https://sveltuse.pages.dev/core/useResizeObserver
 * @param target
 * @param callback
 * @param options
 */
export function useResizeObserver(
	target: MaybeGetter<Element> | MaybeGetter<Element>[],
	callback: ResizeObserverCallback,
	options: UseResizeObserverOptions = {}
) {
	const { window = defaultWindow, ...observerOptions } = options
	let observer: ResizeObserver | undefined

	const cleanup = () => {
		if (observer) {
			observer.disconnect()
			observer = undefined
		}
	}

	const start = () => {
		cleanup()
		if (window) {
			observer = new ResizeObserver(callback)

			const els = Array.isArray(target)
				? target.map((el) => toValue(el))
				: [toValue(target)]

			for (const el of els) {
				observer!.observe(el, observerOptions)
			}
		}
	}

	const isSupported = useIsSupported(
		() => window && 'ResizeObserver' in window,
		() => {
			start()
		}
	)

	const stop = () => {
		cleanup()
	}

	onDestroy(stop)

	return {
		isSupported,
		stop
	}
}

export type UseResizeObserverReturn = ReturnType<typeof useResizeObserver>
