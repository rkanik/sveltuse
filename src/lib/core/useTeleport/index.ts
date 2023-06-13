import { onDestroy, onMount } from 'svelte'

type UseTeleportPayload = {
	el: () => Element
	to?: string | (() => Element)
}

export const useTeleport = (payload: UseTeleportPayload) => {
	const { el, to } = payload

	let _el: Element
	let _to: Element

	const remove = () => {
		_el?.remove()
	}

	const append = () => {
		_to.appendChild(_el)
	}

	onMount(() => {
		_el = el()

		_to = (
			typeof to === 'function'
				? to()
				: typeof to === 'string'
				? document.querySelector(to)
				: document.body
		) as Element

		append()
	})

	onDestroy(remove)

	return { append, remove }
}
