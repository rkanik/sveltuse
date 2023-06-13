import { writable, type Readable } from 'svelte/store'

import { get_store_value } from 'svelte/internal'
import { useDebounceFn } from '$lib/core/useDebounceFn'
import { isPlainObject } from '$lib/utils/isPlainObject'

type OnInputHandler = (
	event: Event & {
		currentTarget: EventTarget & HTMLInputElement
	}
) => void

type MaybeK<T> = T extends Record<string, unknown> ? keyof T : undefined

type Value<T, K extends MaybeK<T>, R extends boolean> = R extends true
	? T
	: K extends keyof T
	? T[K]
	: T

type UseSelectPayload<
	T,
	M extends boolean,
	R extends boolean,
	K extends MaybeK<T>,
	S extends M extends true ? Value<T, K, R>[] : Value<T, K, R>
> = {
	items?: T[]
	multiple?: M
	itemText?: K
	itemValue?: K
	deselectOnClick?: M extends false ? boolean : undefined
	returnObject?: T extends Record<string, unknown> ? R : undefined
	initialSelected?: S
	onChange?: () => void
	onFilter?: (item: T, inputValue: string, itemText: K) => boolean
}

export const useSelect = <
	T,
	M extends boolean,
	R extends boolean,
	K extends MaybeK<T>,
	S extends M extends true ? Value<T, K, R>[] : Value<T, K, R>
>(
	payload: UseSelectPayload<T, M, R, K, S>
) => {
	const {
		multiple = false,
		itemText = 'text',
		itemValue = 'value',
		returnObject = true,
		deselectOnClick = false,
		initialSelected = multiple ? ([] as S) : undefined,
		onFilter = (item, value, itemText) => {
			return (item[itemText as keyof T] ?? '')
				.toString()
				.trim()
				.toLowerCase()
				.includes(value.trim().toLowerCase())
		}
	} = payload

	const toValue = (v: unknown) => {
		return (isPlainObject(v) ? (v as T)[itemValue as keyof T] : v) as Value<
			T,
			K,
			R
		>
	}

	const toSelected = () => {
		return (payload.items || []).filter((item) => {
			return Array.isArray(initialSelected)
				? initialSelected.some((v) => {
						return toValue(item) === toValue(v)
				  })
				: toValue(item) === toValue(initialSelected)
		}) as S
	}

	const items = writable(payload.items || [])
	const selected = writable<S>(toSelected())

	const isSelected = (
		item: Value<T, K, R>,
		$selected = get_store_value(selected)
	) => {
		if ([true, undefined].includes(returnObject)) {
			return multiple
				? ($selected as T[]).includes(item as T)
				: item === $selected
		}

		const value = toValue(item)
		return multiple
			? ($selected as Value<T, K, R>[]).includes(value)
			: value === $selected
	}

	const set = (v: Value<T, K, R>) => {
		if (deselectOnClick) {
			selected.update(($selected) => {
				if (isSelected(v, $selected)) {
					return undefined as S
				}
				return v as S
			})
			items.update((v) => v)
			return
		}
		if (!isSelected(v)) {
			selected.set(v as S)
			items.update((v) => v)
		}
	}

	const update = (value: Value<T, K, R>) => {
		selected.update(($selected) => {
			return (
				isSelected(value, $selected)
					? ($selected as Value<T, K, R>[]).filter((v) => {
							return v !== value
					  })
					: [...($selected as Value<T, K, R>[]), value]
			) as S
		})
		items.update((v) => v)
	}

	const onClickItem = (item: Value<T, K, R>): void => {
		if ([true, undefined].includes(returnObject)) {
			return multiple ? update(item) : set(item)
		}
		const value = toValue(item)
		return multiple ? update(value) : set(value)
	}

	const inputValue = writable('')
	const setInputValue = (value: string) => {
		inputValue.set(value)
		items.update(() => {
			if (!value.trim()) return payload.items || []
			return (payload.items || [])?.filter((item) => {
				return onFilter(item, value, itemText as K)
			})
		})
	}
	const onInputValue = useDebounceFn<OnInputHandler>((event: any) => {
		setInputValue(event.currentTarget?.value || event.target?.value || '')
	}, 300)

	const setSelected = (value: S) => {
		selected.set(value)
		items.update((v) => v)
	}

	return {
		items,
		selected: selected as Readable<S>,
		setSelected,

		isSelected,
		onClickItem,

		// Search
		inputValue,
		setInputValue,
		onInputValue
	}
}
