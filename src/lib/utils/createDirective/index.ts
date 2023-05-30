import type { AnyFn } from 'sveltuse/types'
import anonymous from '../anonymous'

type Binding<Func, Opts> = Func | Opts | [Func, Opts]

// type Directive<F, O> = (el: HTMLElement, binding?: Binding<F, O>) => any

const createDirective = <F extends AnyFn, O extends Record<string, unknown>>(
	callback: (el: HTMLElement, func: F, opts: O) => unknown
) => {
	return (el: HTMLElement, binding: Binding<F, O>) => {
		const func =
			typeof binding === 'function'
				? binding
				: Array.isArray(binding)
				? binding[0]
				: (anonymous as F)

		const opts =
			typeof binding !== 'function'
				? Array.isArray(binding)
					? binding[1]
					: binding || ({} as O)
				: ({} as O)

		callback(el, func, opts)
	}
}

export default createDirective
