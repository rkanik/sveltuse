import anonymous from '../anonymous'

type Binding<F, O> = F | O | [F, O]

const createDirective = <F, O>(
	callback: (el: HTMLElement, func: F, opts: O) => unknown
) => {
	return (el: HTMLElement, binding: Binding<F, O>) => {
		const func = (
			typeof binding === 'function'
				? binding
				: Array.isArray(binding)
				? binding[0]
				: anonymous
		) as F

		const opts = (
			typeof binding !== 'function'
				? Array.isArray(binding)
					? binding[1]
					: binding || {}
				: {}
		) as O

		callback(el, func, opts)
	}
}

export default createDirective
