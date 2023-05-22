/* this implementation is original ported from https://vueuse.org/core/useObjectUrl */

import type { MaybeArray, MaybeGetter } from 'sveltuse/types'

import { writable } from 'svelte/store'
import { onDestroy, onMount } from 'svelte'

import toValue from 'sveltuse/utils/toValue'
import getStore from 'sveltuse/utils/getStore'
import toArray from 'sveltuse/utils/toArray'
import anonymous from 'sveltuse/utils/anonymous'

/**
 * Reactive URL representing an object.
 *
 * @see https://sveltuse.pages.dev/docs/functions/useObjectUrl
 * @param object
 */
export function useObjectUrl(
	object: MaybeGetter<MaybeArray<Blob | MediaSource> | undefined>
) {
	const url = writable<MaybeArray<string> | undefined>()

	const release = () => {
		url.update(($url) => {
			if ($url) {
				toArray($url).forEach(URL.revokeObjectURL)
			}
			return undefined
		})
	}

	const create = () => {
		release()

		const newObject = toValue(object)
		if (newObject) {
			url.set(
				Array.isArray(newObject)
					? newObject.map(URL.createObjectURL)
					: URL.createObjectURL(newObject)
			)
		}
	}

	let unsubscribeStore = anonymous
	onMount(() => {
		create()

		const store = getStore(object)
		if (store) {
			unsubscribeStore = store.subscribe(create)
		}
	})

	onDestroy(() => {
		release()
		unsubscribeStore()
	})

	return {
		...url,
		create
	}
}
