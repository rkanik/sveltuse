import createDirective from 'sveltuse/utils/createDirective'
import { useInfiniteScroll, type UseInfiniteScrollOptions } from '.'

type Func = Parameters<typeof useInfiniteScroll>[1]
type Opts = UseInfiniteScrollOptions

export const dInfiniteScroll = createDirective<Func, Opts>(
	(el, callback, options) => {
		return useInfiniteScroll(el, callback, options)
	}
)
