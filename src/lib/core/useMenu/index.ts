import { useTeleport } from '$lib/core/useTeleport'
import { onMount } from 'svelte'
import { useEventListener } from '../useEventListener'
import { useClickOutside } from '../useClickOutside'

type UseMenuPayload = {
	activatorEl: () => HTMLElement
	contentEl: () => HTMLElement
}

export const useMenu = (payload: UseMenuPayload) => {
	const { activatorEl, contentEl } = payload

	let opened = false
	let _activatorEl: HTMLElement
	let _contentEl: HTMLElement

	const teleport = useTeleport({ el: contentEl })

	const isOpen = () => {
		return false
	}

	const close = () => {
		teleport.remove()
		// _contentEl.style.cssText += `
		//    opacity: 0;
		//    display: block;
		// `
		opened = false
	}

	const open = () => {
		// const optionsMaxHeight = 300

		const rect = _activatorEl.getBoundingClientRect()
		_contentEl.style.width = rect.width + 'px'

		const contentRect = _contentEl.getBoundingClientRect()

		let possibleHeight = contentRect.height
		// let possibleHeight = filtered.length * optionHeight
		// possibleHeight =
		// 	possibleHeight <= optionsMaxHeight ? possibleHeight : optionsMaxHeight

		const offsetTop = rect.top + rect.height
		const canFitToBottom =
			window.innerHeight - (offsetTop + possibleHeight) > 0

		console.log({
			possibleHeight,
			offsetTop,
			innerHeight: window.innerHeight,
			canFitToBottom,
			rect,
			contentRect
		})

		_contentEl.style.cssText += `
			z-index: 9999;
         opacity: 100;
         display: block;
			left: ${rect.left}px;
			width: ${rect.width}px;
		`
		_contentEl.style.cssText += canFitToBottom
			? `top: ${offsetTop}px;`
			: `top: ${rect.top - possibleHeight}px;`

		teleport.append()
		opened = true
	}

	const toggle = () => {
		if (opened) close()
		else open()
	}

	useEventListener(activatorEl, 'click', toggle)
	useClickOutside(contentEl, close, { ignore: [activatorEl] })

	onMount(() => {
		_activatorEl = activatorEl()
		_contentEl = contentEl()

		const rect = _activatorEl.getBoundingClientRect()
		_contentEl.style.cssText += `
         display: block;
         opacity: 0;
         position: fixed;
         width: ${rect.width}px;
      `
		close()
	})

	return {
		open,
		close
		// toggle
	}
}
