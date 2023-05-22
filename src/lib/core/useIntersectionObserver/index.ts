import type { Readable } from 'svelte/store'
import { useSupported } from '../useSupported'

export interface UseIntersectionObserverReturn {
	isSupported: Readable<boolean>
	onIntersect: (
		target: Element,
		init: IntersectOptions
	) => {
		destroy(): void
	}
}

type IntersectOptions = {
	options?: IntersectionObserverInit
	onEnter?: IntersectionObserverCallback
	onLeave?: IntersectionObserverCallback
}

export function useIntersectionObserver(): UseIntersectionObserverReturn {
	const isSupported = useSupported(
		() => window && 'IntersectionObserver' in window
	)

	const onIntersect = (target: Element, init: IntersectOptions) => {
		const {
			options,
			onEnter = () => {
				//
			},
			onLeave = () => {
				//
			}
		} = init

		// instance
		const observer = new IntersectionObserver(
			(entries, observer) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					return onEnter(entries, observer)
				}
				return onLeave(entries, observer)
			},
			//
			options
		)

		// observe
		observer.observe(target)

		// cleanup
		return {
			destroy() {
				observer.unobserve(target)
			}
		}
	}

	return {
		isSupported,
		onIntersect
	}
}
