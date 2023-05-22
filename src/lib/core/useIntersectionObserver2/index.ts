import type { ConfigurableWindow } from '../_configurable'

import { writable, type Readable, type Writable } from 'svelte/store'
import { defaultWindow } from '../_configurable'
import { getWritable } from 'sveltuse/utils/getWritable'
import { useIsSupported } from '../useIsSupported'

export interface UseIntersectionObserverOptions extends ConfigurableWindow {
	/**
	 * Start the IntersectionObserver immediately on creation
	 *
	 * @default true
	 */
	immediate?: boolean

	/**
	 * The Element or Document whose bounds are used as the bounding box when testing for intersection.
	 */
	root?: Element | (() => Element)

	/**
	 * A string which specifies a set of offsets to add to the root's bounding_box when calculating intersections.
	 */
	rootMargin?: string

	/**
	 * Either a single number or an array of numbers between 0.0 and 1.
	 */
	threshold?: number | number[]
}

export interface UseIntersectionObserverReturn {
	isSupported: Readable<boolean>
	isActive: Writable<boolean>
	start: () => void
	stop: () => void
}

const getElement = <T>(v: T | (() => T)): T => {
	if (typeof v === 'function') {
		return v()
	}
	return v
}

/**
 * Detects that a target element's visibility.
 *
 * @see https://vueuse.org/useIntersectionObserver
 * @param target
 * @param callback
 * @param options
 */
export function useIntersectionObserver2(
	target: Element | (() => Element),
	callback: IntersectionObserverCallback,
	options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
	const {
		root,
		threshold = 0.1,
		rootMargin = '0px',
		window = defaultWindow,
		immediate = true
	} = options

	const isActive = writable(immediate)
	let observer: IntersectionObserver | null

	const initialize = () => {
		observer = new IntersectionObserver(callback, {
			root: getElement(root),
			rootMargin,
			threshold
		})

		observer.observe(getElement(target))
	}

	const start = () => {
		if (!getWritable(isActive)) {
			isActive.set(true)
			initialize()
		}
	}

	const stop = () => {
		if (getWritable(isActive)) {
			isActive.set(false)
			observer?.disconnect()
		}
	}

	const isSupported = useIsSupported(
		() => {
			return window && 'IntersectionObserver' in window
		},
		() => {
			getElement(isActive) && start()
		}
	)

	return {
		isSupported,
		isActive,
		start,
		stop
	}
}
