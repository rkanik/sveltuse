import type { MaybeGetter, Store } from 'sveltuse/types'

import { writable, type Writable } from 'svelte/store'
import { getContext, hasContext, setContext } from 'svelte'
import { isWritable } from 'sveltuse/utils/isStore/isStore'

import toValue from 'sveltuse/utils/toValue'

type Context<T> = T extends boolean
	? Writable<boolean>
	: T extends Store<unknown>
	? T
	: Writable<T>

export function useContext<T>(
	key: string,
	context?: MaybeGetter<T>
): Context<T> {
	if (hasContext(key)) {
		return getContext<T>(key) as Context<T>
	}

	if (context !== undefined) {
		return setContext(
			key,
			!isWritable(context) ? writable(toValue(context)) : context
		) as Context<T>
	}

	console.warn(
		`Context not found for key '${key}'. Make sure to initialize the context using useContext('${key}', initialValue). Returning a empty store`
	)

	return writable(undefined) as Context<T>
}
