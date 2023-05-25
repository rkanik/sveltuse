import { onDestroy } from 'svelte'
import { useElementHover } from '.'

import type { UseElementHoverOptions } from '.'

type Callback = (state: boolean) => void

type DElementHoverBinding =
	| Callback
	| (UseElementHoverOptions & {
			callback: Callback
	  })

export const dElementHover = (
	el: HTMLElement,
	binding: DElementHoverBinding
) => {
	const callback = typeof binding === 'function' ? binding : binding.callback

	const isHovered = useElementHover(
		() => el,
		typeof binding !== 'function'
			? {
					window: binding.window,
					delayEnter: binding.delayEnter,
					delayLeave: binding.delayLeave
			  }
			: undefined
	)

	onDestroy(isHovered.subscribe(callback))
}
