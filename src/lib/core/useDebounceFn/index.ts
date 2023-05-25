// Ported from https://vueuse.org/useDebounceFn

import type { DebounceFilterOptions } from 'sveltuse/utils/debounceFilter'
import type { FunctionArgs, MaybeGetter, PromisifyFn } from 'sveltuse/types'

import debounceFilter from 'sveltuse/utils/debounceFilter'
import createFilterWrapper from 'sveltuse/utils/createFilterWrapper'

/**
 * Debounce execution of a function.
 *
 * @see https://sveltuse.pages.dev/core/useDebounceFn
 * @param  fn          A function to be executed after delay milliseconds debounced.
 * @param  ms          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  opts        options
 *
 * @return A new, debounce, function.
 */
export function useDebounceFn<T extends FunctionArgs>(
	fn: T,
	ms: MaybeGetter<number> = 200,
	options: DebounceFilterOptions = {}
): PromisifyFn<T> {
	return createFilterWrapper(debounceFilter(ms, options), fn)
}
