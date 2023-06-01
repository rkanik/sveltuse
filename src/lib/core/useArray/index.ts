import { writable } from 'svelte/store'
import toValue from 'sveltuse/utils/toValue'

export type UseArrayItem<T> = {
	_: T
	set: (item: T) => void
	update: (item: Partial<T>) => void
	remove: () => void
}

export function useArray<T>(items: T[]) {
	const create = <A = unknown>(
		callback: (
			$arr: UseArrayItem<T>[],
			index: number | undefined,
			...args: A[]
		) => UseArrayItem<T>[]
	) => {
		return (index?: number) => {
			return (...args: A[]) => {
				array.update(($arr) => {
					return callback($arr, index, ...args)
				})
			}
		}
	}

	const toUseArrayItem = (
		item: T | UseArrayItem<T>,
		index: number
	): UseArrayItem<T> => {
		return {
			_:
				item &&
				typeof item === 'object' &&
				['set', 'update', 'remove'].every((key) => {
					return key in item
				})
					? (item as UseArrayItem<T>)._
					: (item as T),
			set: createSetter(index),
			update: createUpdater(index),
			remove: createRemover(index)
		}
	}

	// UseArrayItem methods
	const createSetter = create(($arr, index, item: T) => {
		return $arr.map(($item, $index) => {
			if (index !== $index) return $item
			return {
				...$item,
				_: item
			}
		})
	})

	const createUpdater = create(($arr, index, item: Partial<T>) => {
		return $arr.map(($item, $index) => {
			if (index !== $index) return $item
			return {
				...$item,
				_:
					typeof item === 'object'
						? {
								...$item._,
								...item
						  }
						: (item as T)
			}
		})
	})

	const createRemover = create(($arr, index) => {
		return $arr.filter((_, $index) => $index !== index).map(toUseArrayItem)
	})

	// Array Methods
	const createPush = create(($arr, _, ...items: T[]) => {
		return [
			...$arr,
			...items.map((item, index) => {
				return toUseArrayItem(item, $arr.length + index)
			})
		].map(toUseArrayItem)
	})

	const createUnshift = create(($arr, _, ...items: T[]) => {
		return [
			...items.map((item, index) => {
				return toUseArrayItem(item, index)
			}),
			...$arr
		].map(toUseArrayItem)
	})

	const createComparatorRemover = create(
		($arr, _, comparator: (a: T) => boolean) => {
			return $arr.filter(($item) => !comparator($item._)).map(toUseArrayItem)
		}
	) as () => (comparator: (a: T) => boolean) => void

	const createIndexByRemover = create(($arr, _, index: number) => {
		return $arr.filter((_, $index) => index !== $index).map(toUseArrayItem)
	}) as () => (index: number) => void

	const array = writable<UseArrayItem<T>[]>(items.map(toUseArrayItem))

	return {
		push: createPush(),
		unshift: createUnshift(),
		remove: createComparatorRemover(),
		removeByIndex: createIndexByRemover(),
		get() {
			return toValue(array).map((v) => v._)
		},
		set(items: T[]) {
			array.set(items.map(toUseArrayItem))
		},
		update(updater: (items: T[]) => T[]) {
			array.update(($arr) => {
				return updater(
					$arr.map(($item) => {
						return $item._
					})
				).map(toUseArrayItem)
			})
		},
		subscribe: array.subscribe
	}
}
