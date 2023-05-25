import type { AnyFn, ArgumentsType, EventFilter } from 'sveltuse/types'

export default function createFilterWrapper<T extends AnyFn>(
	filter: EventFilter,
	fn: T
) {
	function wrapper(this: any, ...args: ArgumentsType<T>) {
		return new Promise<ReturnType<T>>((resolve, reject) => {
			// make sure it's a promise
			Promise.resolve(
				filter(() => fn.apply(this, args), { fn, thisArg: this, args })
			)
				.then(resolve)
				.catch(reject)
		})
	}

	return wrapper
}
