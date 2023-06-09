/* this implementation is original ported from https://vueuse.org/core/useScriptTag */

import type { MaybeGetter } from 'sveltuse/types'
import type { ConfigurableDocument } from '../_configurable'

import { writable } from 'svelte/store'
import { onDestroy, onMount } from 'svelte'
import toValue from 'sveltuse/utils/toValue'
import { getWritable } from 'sveltuse/utils/getWritable'
import { defaultDocument } from 'sveltuse/constants'
import anonymous from 'sveltuse/utils/anonymous'

export interface UseScriptTagOptions extends ConfigurableDocument {
	/**
	 * Load the script immediately
	 *
	 * @default true
	 */
	immediate?: boolean

	/**
	 * Add `async` attribute to the script tag
	 *
	 * @default true
	 */
	async?: boolean

	/**
	 * Script type
	 *
	 * @default 'text/javascript'
	 */
	type?: string

	/**
	 * Manual controls the timing of loading and unloading
	 *
	 * @default false
	 */
	manual?: boolean

	crossOrigin?: 'anonymous' | 'use-credentials'
	referrerPolicy?:
		| 'no-referrer'
		| 'no-referrer-when-downgrade'
		| 'origin'
		| 'origin-when-cross-origin'
		| 'same-origin'
		| 'strict-origin'
		| 'strict-origin-when-cross-origin'
		| 'unsafe-url'
	noModule?: boolean

	defer?: boolean

	/**
	 * Add custom attribute to the script tag
	 *
	 */
	attrs?: Record<string, string>
}

/**
 * Async script tag loading.
 *
 * @see https://sveltuse.pages.dev/docs/functions/useScriptTag
 * @param src
 * @param onLoaded
 * @param options
 */
export function useScriptTag(
	src: MaybeGetter<string>,
	onLoaded: (el: HTMLScriptElement) => void = anonymous,
	options: UseScriptTagOptions = {}
) {
	const {
		immediate = true,
		manual = false,
		type = 'text/javascript',
		async = true,
		crossOrigin,
		referrerPolicy,
		noModule,
		defer,
		document = defaultDocument,
		attrs = {}
	} = options
	const scriptTag = writable<HTMLScriptElement | null>(null)

	let _promise: Promise<HTMLScriptElement | boolean> | null = null

	/**
	 * Load the script specified via `src`.
	 *
	 * @param waitForScriptLoad Whether if the Promise should resolve once the "load" event is emitted by the <script> attribute, or right after appending it to the DOM.
	 * @returns Promise<HTMLScriptElement>
	 */
	const loadScript = (
		waitForScriptLoad: boolean
	): Promise<HTMLScriptElement | boolean> =>
		new Promise((resolve, reject) => {
			// Some little closure for resolving the Promise.
			const resolveWithElement = (el: HTMLScriptElement) => {
				scriptTag.set(el)
				resolve(el)
				return el
			}

			// Check if document actually exists, otherwise resolve the Promise (SSR Support).
			if (!document) {
				resolve(false)
				return
			}

			// Local variable defining if the <script> tag should be appended or not.
			let shouldAppend = false

			let el = document.querySelector<HTMLScriptElement>(
				`script[src="${toValue(src)}"]`
			)

			// Script tag not found, preparing the element for appending
			if (!el) {
				el = document.createElement('script')
				el.type = type
				el.async = async
				el.src = toValue(src)

				// Optional attributes
				if (defer) el.defer = defer
				if (crossOrigin) el.crossOrigin = crossOrigin
				if (noModule) el.noModule = noModule
				if (referrerPolicy) el.referrerPolicy = referrerPolicy

				Object.entries(attrs).forEach(([name, value]) =>
					el?.setAttribute(name, value)
				)

				// Enables shouldAppend
				shouldAppend = true
			}
			// Script tag already exists, resolve the loading Promise with it.
			else if (el.hasAttribute('data-loaded')) {
				resolveWithElement(el)
			}

			// Event listeners
			el.addEventListener('error', (event) => reject(event))
			el.addEventListener('abort', (event) => reject(event))
			el.addEventListener('load', () => {
				el!.setAttribute('data-loaded', 'true')

				onLoaded(el!)
				resolveWithElement(el!)
			})

			// Append the <script> tag to head.
			if (shouldAppend) el = document.head.appendChild(el)

			// If script load awaiting isn't needed, we can resolve the Promise.
			if (!waitForScriptLoad) resolveWithElement(el)
		})

	/**
	 * Exposed singleton wrapper for `loadScript`, avoiding calling it twice.
	 *
	 * @param waitForScriptLoad Whether if the Promise should resolve once the "load" event is emitted by the <script> attribute, or right after appending it to the DOM.
	 * @returns Promise<HTMLScriptElement>
	 */
	const load = (
		waitForScriptLoad = true
	): Promise<HTMLScriptElement | boolean> => {
		if (!_promise) _promise = loadScript(waitForScriptLoad)

		return _promise
	}

	/**
	 * Unload the script specified by `src`.
	 */
	const unload = () => {
		if (!document) return

		_promise = null

		if (getWritable(scriptTag)) {
			scriptTag.set(null)
		}

		const el = document.querySelector<HTMLScriptElement>(
			`script[src="${toValue(src)}"]`
		)
		if (el) document.head.removeChild(el)
	}

	onMount(() => {
		if (immediate && !manual) {
			load()
		}
	})

	onDestroy(() => {
		if (!manual) {
			unload()
		}
	})

	return {
		scriptTag,
		load,
		unload
	}
}

export type UseScriptTagReturn = ReturnType<typeof useScriptTag>
