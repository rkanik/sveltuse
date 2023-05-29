// Ported from https://vueuse.org/useMutationObserver

import type { MaybeGetter } from 'sveltuse/types'
import type { ConfigurableWindow } from '../_configurable'

import { onDestroy } from 'svelte'
import { defaultWindow } from 'sveltuse/constants'
import { useIsSupported } from '../useIsSupported'

import toValue from 'sveltuse/utils/toValue'

export interface UseMutationObserverOptions
	extends MutationObserverInit,
		ConfigurableWindow {}

/**
 * Watch for changes being made to the DOM tree.
 *
 * @see https://sveltuse.pages.dev/core/useMutationObserver
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver MutationObserver MDN
 * @param target
 * @param callback
 * @param options
 */
export function useMutationObserver(
	target: MaybeGetter<Node>,
	callback: MutationCallback,
	options: UseMutationObserverOptions = {}
) {
	let observer: MutationObserver | undefined
	const { window = defaultWindow, ...mutationOptions } = options

	const stop = () => {
		if (observer) {
			observer.disconnect()
			observer = undefined
		}
	}

	const isSupported = useIsSupported(
		() => window && 'MutationObserver' in window,
		() => {
			stop()

			const el = toValue(target)
			observer = new MutationObserver(callback)
			observer!.observe(el, mutationOptions)
		}
	)

	onDestroy(stop)

	return {
		isSupported,
		stop
	}
}

export type UseMutationObserverReturn = ReturnType<typeof useMutationObserver>
