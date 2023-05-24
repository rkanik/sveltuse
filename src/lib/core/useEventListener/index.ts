// Ported from https://vueuse.org/core/useEventListener

import type { Arrayable, Fn, MaybeGetter, Store } from 'sveltuse/types'

import { onDestroy, onMount } from 'svelte'
import { defaultWindow } from 'sveltuse/constants'

import anonymous from 'sveltuse/utils/anonymous'
import toValue from 'sveltuse/utils/toValue'
import isStore from 'sveltuse/utils/isStore/isStore'

interface InferEventTarget<Events> {
	addEventListener(event: Events, fn?: any, options?: any): any
	removeEventListener(event: Events, fn?: any, options?: any): any
}

export type WindowEventName = keyof WindowEventMap
export type DocumentEventName = keyof DocumentEventMap

export interface GeneralEventListener<E = Event> {
	(evt: E): void
}

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 1: Omitted Window target
 *
 * @see https://sveltuse.pages.dev/docs/functions/useEventListener
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<E extends keyof WindowEventMap>(
	event: Arrayable<E>,
	listener: Arrayable<(this: Window, ev: WindowEventMap[E]) => any>,
	options?: MaybeGetter<boolean | AddEventListenerOptions>
): Fn

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 2: Explicitly Window target
 *
 * @see https://sveltuse.pages.dev/docs/functions/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<E extends keyof WindowEventMap>(
	target: Window,
	event: Arrayable<E>,
	listener: Arrayable<(this: Window, ev: WindowEventMap[E]) => any>,
	options?: MaybeGetter<boolean | AddEventListenerOptions>
): Fn

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 3: Explicitly Document target
 *
 * @see https://sveltuse.pages.dev/docs/functions/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<E extends keyof DocumentEventMap>(
	target: DocumentOrShadowRoot,
	event: Arrayable<E>,
	listener: Arrayable<(this: Document, ev: DocumentEventMap[E]) => any>,
	options?: MaybeGetter<boolean | AddEventListenerOptions>
): Fn

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 4: Custom event target with event type infer
 *
 * @see https://sveltuse.pages.dev/docs/functions/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<Names extends string, EventType = Event>(
	target: InferEventTarget<Names>,
	event: Arrayable<Names>,
	listener: Arrayable<GeneralEventListener<EventType>>,
	options?: MaybeGetter<boolean | AddEventListenerOptions>
): Fn

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 5: Custom event target fallback
 *
 * @see https://sveltuse.pages.dev/docs/functions/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<EventType = Event>(
	target: MaybeGetter<EventTarget | null | undefined> | Store<EventTarget>,
	event: Arrayable<string>,
	listener: Arrayable<GeneralEventListener<EventType>>,
	options?: MaybeGetter<boolean | AddEventListenerOptions>
): Fn

export function useEventListener(...args: any[]) {
	let target: MaybeGetter<EventTarget> | Store<EventTarget> | undefined
	let events: Arrayable<string>
	let listeners: Arrayable<Function>
	let options: MaybeGetter<boolean | AddEventListenerOptions> | undefined

	if (typeof args[0] === 'string' || Array.isArray(args[0])) {
		;[events, listeners, options] = args
		target = defaultWindow
	} else {
		;[target, events, listeners, options] = args
	}

	if (!target) return anonymous

	if (!Array.isArray(events)) events = [events]
	if (!Array.isArray(listeners)) listeners = [listeners]

	const cleanups: Function[] = []
	const cleanup = () => {
		cleanups.forEach((fn) => fn())
		cleanups.length = 0
	}

	const register = (
		el: EventTarget,
		event: string,
		listener: any,
		options: any
	) => {
		el.addEventListener(event, listener, options)
		return () => el.removeEventListener(event, listener, options)
	}

	const start = () => {
		cleanup()

		const el = toValue(target)
		if (!el) return

		cleanups.push(
			...(events as string[]).flatMap((event) => {
				return (listeners as Function[]).map((listener) => {
					return register(el, event, listener, options)
				})
			})
		)
	}

	const stop = () => {
		cleanup()
		unsubscribe()
	}

	let unsubscribe = anonymous

	onMount(() => {
		start()
		if (isStore(target)) {
			unsubscribe = target.subscribe(start)
		}
	})

	onDestroy(stop)

	return stop
}
