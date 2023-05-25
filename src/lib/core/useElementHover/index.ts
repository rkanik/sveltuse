// Ported from https://vueuse.org/core/useElementHover

import type { MaybeGetter } from 'sveltuse/types'
import type { ConfigurableWindow } from '../_configurable'

import { defaultWindow } from 'sveltuse/constants'
import { useEventListener } from '../useEventListener'
import { writable, type Readable } from 'svelte/store'

export interface UseElementHoverOptions extends ConfigurableWindow {
	delayEnter?: number
	delayLeave?: number
}

export function useElementHover(
	el: MaybeGetter<EventTarget | null | undefined>,
	options: UseElementHoverOptions = {}
): Readable<boolean> {
	console.log('useElementHover', el)
	const { delayEnter = 0, delayLeave = 0, window = defaultWindow } = options

	const isHovered = writable(false)
	let timer: ReturnType<typeof setTimeout> | undefined

	const toggle = (entering: boolean) => {
		const delay = entering ? delayEnter : delayLeave
		if (timer) {
			clearTimeout(timer)
			timer = undefined
		}

		if (delay) {
			timer = setTimeout(() => {
				isHovered.set(entering)
			}, delay)
		} else {
			isHovered.set(entering)
		}
	}

	if (!window) return isHovered

	useEventListener(el, 'mouseenter', () => toggle(true), { passive: true })
	useEventListener(el, 'mouseleave', () => toggle(false), { passive: true })

	return isHovered
}
