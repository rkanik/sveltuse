/* this implementation is original ported from https://vueuse.org/core/useMediaQuery */
import type { ConfigurableWindow } from '../_configurable'

import { onDestroy } from 'svelte'
import { writable } from 'svelte/store'
import { useSupported } from '../useSupported'
import { defaultWindow } from '../_configurable'

/**
 * Reactive Media Query.
 *
 * @see https://sveltuse.pages.dev/docs/functions/useMediaQuery
 * @param query
 * @param options
 */
export function useMediaQuery(query: string, options: ConfigurableWindow = {}) {
	const { window = defaultWindow } = options
	const isSupported = useSupported(
		() =>
			window &&
			'matchMedia' in window &&
			typeof window.matchMedia === 'function'
	)

	let mediaQuery: MediaQueryList | undefined
	const matches = writable(false)

	const cleanup = () => {
		if (!mediaQuery) return
		if ('removeEventListener' in mediaQuery)
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			mediaQuery.removeEventListener('change', update)
		// @ts-expect-error deprecated API
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		else mediaQuery.removeListener(update)
	}

	const update = () => {
		cleanup()

		mediaQuery = window!.matchMedia(query)
		matches.set(!!mediaQuery?.matches)

		if (!mediaQuery) return

		if ('addEventListener' in mediaQuery) {
			mediaQuery.addEventListener('change', update)
			//
		} else {
			// @ts-expect-error deprecated API
			mediaQuery.addListener(update)
		}
	}

	const unsubscribeIsSupported = isSupported.subscribe(($isSupported) => {
		if ($isSupported) {
			update()
			unsubscribeIsSupported()
		}
	})

	onDestroy(() => {
		cleanup()
	})

	return matches
}
