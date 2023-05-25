// Ported from https://vueuse.org/useToggle

import type { MaybeGetter } from 'sveltuse/types'

import { writable, type Readable } from 'svelte/store'
import toValue from 'sveltuse/utils/toValue'

/**
 * A boolean ref with a toggler
 *
 * @see https://sveltuse.pages.dev/core/useToggle
 * @param [initialValue=false]
 */
export function useToggle(
	initialValue: MaybeGetter<boolean> = false
): readonly [Readable<boolean>, (value?: boolean) => boolean] {
	const innerValue = writable(toValue(initialValue))

	function toggle(value?: boolean) {
		if (value !== undefined) {
			innerValue.set(value)
			return value
		} else {
			innerValue.update((v) => {
				return !v ? true : false
			})
			return toValue(innerValue)
		}
	}

	return [innerValue, toggle] as const
}
