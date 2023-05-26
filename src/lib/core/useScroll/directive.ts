import type { UseScrollOptions, UseScrollReturn } from '.'
import { useScroll } from '.'

type BindingValueFunction = (state: UseScrollReturn) => void

type BindingValueArray = [BindingValueFunction, UseScrollOptions]

export const dScroll = (
	el: HTMLElement,
	binding: BindingValueFunction | BindingValueArray
) => {
	if (typeof binding === 'function') {
		const state = useScroll(el, {
			onScroll() {
				binding(state)
			},
			onStop() {
				binding(state)
			}
		})
	} else {
		const [handler, options] = binding
		const state = useScroll(el, {
			...options,
			onScroll(e) {
				options.onScroll?.(e)
				handler(state)
			},
			onStop(e) {
				options.onStop?.(e)
				handler(state)
			}
		})
	}
}
