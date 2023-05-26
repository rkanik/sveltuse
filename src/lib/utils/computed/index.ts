import { derived, type Writable, type Updater } from 'svelte/store'
import getStoreValue from '../getStoreValue'

type ComputedGetter<T> = (value: T) => T
type ComputedSetter<T> = (value: T, store: Writable<T>) => void
type ComputedUpdater<T> = (
	updater: Updater<T>,
	store: Writable<T>,
	value: T
) => void

type ComputedOptions<T> = {
	get?: ComputedGetter<T>
	set?: ComputedSetter<T>
	update?: ComputedUpdater<T>
}

export default function computed<T>(
	store: Writable<T>,
	options?: ComputedGetter<T> | ComputedOptions<T>
) {
	const get =
		typeof options === 'function' ? options : options?.get || ((v) => v)

	const setter: ComputedSetter<T> | null =
		typeof options !== 'function' && !!options?.set ? options.set : null

	const update: ComputedUpdater<T> | null =
		typeof options !== 'function' && !!options?.update ? options.update : null

	const readonlyStore = derived(store, get)

	return {
		...readonlyStore,
		set(value) {
			setter ? setter(value, store) : store.set(value)
		},
		update(updater) {
			update
				? update(updater, store, updater(getStoreValue(store)))
				: store.update(updater)
		}
	} as Writable<T>
}
