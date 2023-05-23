import type { Readable } from 'svelte/store'
import type { MaybeGetter } from 'sveltuse/types'

import { writable } from 'svelte/store'
import { useEventListener } from '../useEventListener'

export interface UseDropZoneReturn {
	isOverDropZone: Readable<boolean>
}

export function useDropZone(
	target: MaybeGetter<HTMLElement | null | undefined>,
	onDrop?: (files: File[] | null) => void
): UseDropZoneReturn {
	//
	let counter = 0
	const isOverDropZone = writable(false)

	useEventListener<DragEvent>(target, 'dragenter', (event) => {
		event.preventDefault()
		counter += 1
		isOverDropZone.set(true)
	})

	useEventListener<DragEvent>(target, 'dragover', (event) => {
		event.preventDefault()
	})

	useEventListener<DragEvent>(target, 'dragleave', (event) => {
		event.preventDefault()
		counter -= 1
		if (counter === 0) isOverDropZone.set(false)
	})

	useEventListener<DragEvent>(target, 'drop', (event) => {
		event.preventDefault()
		counter = 0
		isOverDropZone.set(false)
		const files = Array.from(event.dataTransfer?.files ?? [])
		onDrop?.(files.length === 0 ? null : files)
	})

	return {
		isOverDropZone
	}
}
