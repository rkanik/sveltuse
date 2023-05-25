// Ported from https://vueuse.org/usePreferredDark

import { useMediaQuery } from '../useMediaQuery'
import type { ConfigurableWindow } from '../_configurable'

/**
 * Reactive dark theme preference.
 *
 * @see https://sveltuse.pages.dev/core/usePreferredDark
 * @param [options]
 */
export function usePreferredDark(options?: ConfigurableWindow) {
	return useMediaQuery('(prefers-color-scheme: dark)', options)
}
