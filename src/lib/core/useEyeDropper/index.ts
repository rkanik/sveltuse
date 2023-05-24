// Ported from https://vueuse.org/core/useEyeDropper/

import { writable } from 'svelte/store'
import { useSupported } from '../useSupported'

import toValue from 'sveltuse/utils/toValue'

export interface EyeDropperOpenOptions {
	/**
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
	 */
	signal?: AbortSignal
}

export interface EyeDropper {
	// eslint-disable-next-line @typescript-eslint/no-misused-new
	new (): EyeDropper
	open: (options?: EyeDropperOpenOptions) => Promise<{ sRGBHex: string }>
	[Symbol.toStringTag]: 'EyeDropper'
}

export interface UseEyeDropperOptions {
	/**
	 * Initial sRGBHex.
	 *
	 * @default ''
	 */
	initialValue?: string
}

/**
 * Reactive [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API)
 *
 * @see https://sveltuse.pages.dev/docs/functions/useEyeDropper
 * @param initialValue string
 */
export function useEyeDropper(options: UseEyeDropperOptions = {}) {
	const { initialValue = '' } = options
	const isSupported = useSupported(
		() => typeof window !== 'undefined' && 'EyeDropper' in window
	)
	const sRGBHex = writable(initialValue)

	async function open(openOptions?: EyeDropperOpenOptions) {
		if (!toValue(isSupported)) return
		const eyeDropper: EyeDropper = new (window as any).EyeDropper()
		const result = await eyeDropper.open(openOptions)
		sRGBHex.set(result.sRGBHex)
		return result
	}

	return { isSupported, sRGBHex, open }
}

export type UseEyeDropperReturn = ReturnType<typeof useEyeDropper>
