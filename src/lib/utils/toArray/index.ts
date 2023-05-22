import type { MaybeArray } from 'sveltuse/types'

export default function toArray<T>(input: MaybeArray<T>) {
	return !Array.isArray(input) ? [input] : input
}
