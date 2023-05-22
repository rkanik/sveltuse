/* Ported from https://vueuse.org/core/useClipboard/ */

import type { MaybeGetter } from 'sveltuse/types'
import type { ConfigurableNavigator } from '../_configurable'

import { writable, type Readable } from 'svelte/store'
import { defaultNavigator } from 'sveltuse/constants'
import { useSupported } from '../useSupported'
import { useTimeoutFn } from '../useTimeoutFn'
import toValue from 'sveltuse/utils/toValue'

export interface UseClipboardOptions<Source> extends ConfigurableNavigator {
	/**
	 * Enabled reading for clipboard
	 *
	 * @default false
	 */
	read?: boolean

	/**
	 * Copy source
	 */
	source?: Source

	/**
	 * Milliseconds to reset state of `copied` ref
	 *
	 * @default 1500
	 */
	copiedDuring?: number

	/**
	 * Whether fallback to document.execCommand('copy') if clipboard is undefined.
	 *
	 * @default false
	 */
	legacy?: boolean
}

export interface UseClipboardReturn<Optional> {
	isSupported: Readable<boolean>
	text: Readable<string>
	copied: Readable<boolean>
	copy: Optional extends true
		? (text?: string) => Promise<void>
		: (text: string) => Promise<void>
}

/**
 * Reactive Clipboard API.
 *
 * @see https://sveltuse.pages.dev/docs/functions/useClipboard
 * @param options
 */
export function useClipboard(
	options?: UseClipboardOptions<undefined>
): UseClipboardReturn<false>
export function useClipboard(
	options: UseClipboardOptions<MaybeGetter<string>>
): UseClipboardReturn<true>
export function useClipboard(
	options: UseClipboardOptions<MaybeGetter<string> | undefined> = {}
): UseClipboardReturn<boolean> {
	const {
		navigator = defaultNavigator,
		read = false,
		source,
		copiedDuring = 1500,
		legacy = false
	} = options

	const events = ['copy', 'cut']

	const isSupported = writable(legacy)
	const isClipboardApiSupported = useSupported(
		() => navigator && 'clipboard' in navigator
	)
	const unsubscribeIsClipboardApiSupported = isClipboardApiSupported.subscribe(
		(v) => {
			if (v) {
				isSupported.set(true)
				unsubscribeIsClipboardApiSupported()
			}
		}
	)

	const text = writable('')
	const copied = writable(false)
	const timeout = useTimeoutFn(() => {
		copied.set(false)
	}, copiedDuring)

	function updateText() {
		if (toValue(isClipboardApiSupported)) {
			navigator!.clipboard.readText().then((value) => {
				text.set(value)
			})
		} else {
			text.set(legacyRead())
		}
	}

	if (toValue(isSupported) && read) {
		for (const event of events) {
			console.log('event', event, updateText)
			// useEventListener(event as WindowEventName, updateText)
		}
	}

	async function copy(value = toValue(source)) {
		if (toValue(isSupported) && value != null) {
			if (toValue(isClipboardApiSupported))
				await navigator!.clipboard.writeText(value)
			else legacyCopy(value)

			text.set(value)
			copied.set(true)
			timeout.start()
		}
	}

	function legacyCopy(value: string) {
		const ta = document.createElement('textarea')
		ta.value = value ?? ''
		ta.style.position = 'absolute'
		ta.style.opacity = '0'
		document.body.appendChild(ta)
		ta.select()
		document.execCommand('copy')
		ta.remove()
	}

	function legacyRead() {
		return document?.getSelection?.()?.toString() ?? ''
	}

	return {
		text,
		copied,
		isSupported,
		copy
	}
}
