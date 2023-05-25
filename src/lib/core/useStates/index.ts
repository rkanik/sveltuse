import { derived, writable, type Readable, type Writable } from 'svelte/store'
import type { MaybeGetter } from 'sveltuse/types'
import toValue from 'sveltuse/utils/toValue'

const toReadonly = <T>(store: Writable<T>) => {
	return derived(store, (v) => v)
}

type Enum<T> = {
	[key: string]: T | string
	[value: number]: string
}

type States<T> = readonly T[] | Enum<T> //| Record<string, T>

type EnumSetter<S extends Enum<unknown>> = S[keyof S] | ((e: S) => S[keyof S])

type UseStatesEnumReturn<S extends Enum<unknown>> = Readable<S[keyof S]> & {
	set: (value: EnumSetter<S>) => void
	// is: (value: EnumSetter<S>) => boolean
}

type UseStatesArrayReturn<S extends readonly unknown[]> = Readable<
	S[number]
> & {
	set: (value: S[number]) => S[number]
	// is: (value: S[number]) => boolean
}

type UseStatesReturn<S extends States<unknown>> = S extends readonly unknown[]
	? UseStatesArrayReturn<S>
	: S extends Enum<unknown>
	? UseStatesEnumReturn<S>
	: []

export function useStates<S extends States<unknown>>(
	states: S,
	initialValue?: S extends readonly unknown[] ? S[number] : S[keyof S]
): UseStatesReturn<S> {
	//
	if (Array.isArray(states)) {
		const store = writable<S[number]>(initialValue || states[0])
		return {
			...toReadonly(store),
			// is(value: S[number]) {
			// 	return value === toValue(store)
			// },
			set(value: S[number]) {
				store.set(value)
				return value
			}
		} as UseStatesReturn<S>
	}

	const store = writable<S[keyof S]>(initialValue)

	return {
		...toReadonly(store),
		// is(value: MaybeGetter<S[keyof S], S>) {
		// 	return toValue(store) === toValue(value, states)
		// },
		set(value: MaybeGetter<S[keyof S], S>) {
			const newValue = toValue(value, states)
			store.set(newValue)
			return newValue
		}
	} as UseStatesReturn<S>
}
