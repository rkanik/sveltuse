import type { AnyFn, EventFilter, MaybeGetter } from 'sveltuse/types'
import anonymous from '../anonymous'
import toValue from '../toValue'

export interface DebounceFilterOptions {
	/**
	 * The maximum time allowed to be delayed before it's invoked.
	 * In milliseconds.
	 */
	maxWait?: MaybeGetter<number>

	/**
	 * Whether to reject the last call if it's been cancel.
	 *
	 * @default false
	 */
	rejectOnCancel?: boolean
}

/**
 * Create an EventFilter that debounce the events
 *
 * @param ms
 * @param options
 */
export default function debounceFilter(
	ms: MaybeGetter<number>,
	options: DebounceFilterOptions = {}
) {
	let timer: ReturnType<typeof setTimeout> | undefined
	let maxTimer: ReturnType<typeof setTimeout> | undefined | null
	let lastRejector: AnyFn = anonymous

	const _clearTimeout = (timer: ReturnType<typeof setTimeout>) => {
		clearTimeout(timer)
		lastRejector()
		lastRejector = anonymous
	}

	const filter: EventFilter = (invoke) => {
		const duration = toValue(ms)
		const maxDuration = toValue(options.maxWait)

		if (timer) _clearTimeout(timer)

		if (duration <= 0 || (maxDuration !== undefined && maxDuration <= 0)) {
			if (maxTimer) {
				_clearTimeout(maxTimer)
				maxTimer = null
			}
			return Promise.resolve(invoke())
		}

		return new Promise((resolve, reject) => {
			lastRejector = options.rejectOnCancel ? reject : resolve
			// Create the maxTimer. Clears the regular timer on invoke
			if (maxDuration && !maxTimer) {
				maxTimer = setTimeout(() => {
					if (timer) _clearTimeout(timer)
					maxTimer = null
					resolve(invoke())
				}, maxDuration)
			}

			// Create the regular timer. Clears the max timer on invoke
			timer = setTimeout(() => {
				if (maxTimer) _clearTimeout(maxTimer)
				maxTimer = null
				resolve(invoke())
			}, duration)
		})
	}

	return filter
}
