import type { MaybeGetter } from 'sveltuse/types'

import { onMount } from 'svelte'
import { useDebounceFn } from '../useDebounceFn'
import { useEventListener } from '../useEventListener'

import anonymous from 'sveltuse/utils/anonymous'

export function useScrollEnd(
	element?: MaybeGetter<EventTarget | undefined | null>,
	callback: (e: Event) => void = anonymous,
	options?: AddEventListenerOptions & {
		delay?: number
	}
) {
	const { delay = 300, ...addEventListenerOptions } = options || {}
	const callbackDebounced = useDebounceFn(callback, delay)

	const removeScrollListener = useEventListener(
		element,
		'scroll',
		callbackDebounced,
		addEventListenerOptions
	)

	const removeScrollEndListener = useEventListener(
		element,
		'scrollend',
		callback,
		addEventListenerOptions
	)

	const stop = () => {
		removeScrollListener()
		removeScrollEndListener()
	}

	onMount(() => {
		if ('onscrollend' in window) {
			removeScrollListener()
		}
	})

	return stop
}
