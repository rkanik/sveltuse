// Ported from https://vueuse.org/useWindowScroll

import { useScroll } from '../useScroll'

/**
 * Reactive window scroll.
 *
 * @see https://svaltuse.pages.dev/useWindowScroll
 * @param options
 */
export function useWindowScroll() {
	return useScroll(() => window)
}

export type UseWindowScrollReturn = ReturnType<typeof useWindowScroll>
