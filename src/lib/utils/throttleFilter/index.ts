import toValue from '../toValue'
import anonymous from '../anonymous'

import type { AnyFn, EventFilter, MaybeGetter } from 'sveltuse/types'

/**
 * Create an EventFilter that throttle the events
 *
 * @param ms
 * @param [trailing=true]
 * @param [leading=true]
 * @param [rejectOnCancel=false]
 */
export default function throttleFilter(
	ms: MaybeGetter<number>,
	trailing = true,
	leading = true,
	rejectOnCancel = false
) {
	let lastExec = 0
	let timer: ReturnType<typeof setTimeout> | undefined
	let isLeading = true
	let lastRejector: AnyFn = anonymous
	let lastValue: any

	const clear = () => {
		if (timer) {
			clearTimeout(timer)
			timer = undefined
			lastRejector()
			lastRejector = anonymous
		}
	}

	const filter: EventFilter = (_invoke) => {
		const duration = toValue(ms)
		const elapsed = Date.now() - lastExec
		const invoke = () => {
			return (lastValue = _invoke())
		}

		clear()

		if (duration <= 0) {
			lastExec = Date.now()
			return invoke()
		}

		if (elapsed > duration && (leading || !isLeading)) {
			lastExec = Date.now()
			invoke()
		} else if (trailing) {
			lastValue = new Promise((resolve, reject) => {
				lastRejector = rejectOnCancel ? reject : resolve
				timer = setTimeout(() => {
					lastExec = Date.now()
					isLeading = true
					resolve(invoke())
					clear()
				}, Math.max(0, duration - elapsed))
			})
		}

		if (!leading && !timer)
			timer = setTimeout(() => (isLeading = true), duration)

		isLeading = false
		return lastValue
	}

	return filter
}
