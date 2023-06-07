import type { SortableOptions } from 'sortablejs'
import type { Readable, Writable } from 'svelte/store'

import { writable } from 'svelte/store'
import { onDestroy, onMount } from 'svelte'

import Sortable from 'sortablejs'

export const anonymous = () => {
	//
}

export function removeNode(node: Element) {
	if (node.parentElement !== null) {
		node.parentElement.removeChild(node)
	}
}

export function insertNodeAt(
	fatherNode: Element,
	node: Element,
	position: number
) {
	const refNode =
		position === 0
			? fatherNode.children[0]
			: fatherNode.children[position - 1].nextSibling
	fatherNode.insertBefore(node, refNode)
}

export function getStoreValue<T>(store: Writable<T>): T {
	let value
	store.subscribe(($store) => (value = $store))()
	return value as T
}

export type Nullable<T> = T | null
export type Optional<T> = T | undefined

export type OnUpdatedHandler = (newIndex: number, oldIndex: number) => void

export type UseSortableOptions<Item> = SortableOptions & {
	element: () => HTMLElement
	items: Writable<Item[]>
	clone?: (original: unknown) => unknown
	onUpdated?: Optional<OnUpdatedHandler>
}

export const useSortable = <Item>(options: UseSortableOptions<Item>) => {
	const {
		element,
		items,
		clone = (v: unknown) => v,
		onUpdated = anonymous,
		...restOptions
	} = options

	let el: HTMLElement
	let context: {
		index: number
		element: Item
	}

	const sortable = writable<Nullable<Sortable>>(null)

	const getChildrenNodes = () => {
		return [...el.children]
	}

	const getUnderlyingItem = (itemElement: Element) => {
		const index = getChildrenNodes().indexOf(itemElement)
		return {
			index,
			element: getStoreValue(items)[index]
		}
	}

	const spliceItems = (
		start: number,
		deleteCount: number,
		...newItems: Item[]
	) => {
		items.update(($items) => {
			$items.splice(start, deleteCount, ...newItems)
			return $items
		})
	}

	const updatePosition = (oldIndex: number, newIndex: number) => {
		items.update(($items) => {
			$items.splice(newIndex, 0, $items.splice(oldIndex, 1)[0])
			return $items
		})
	}

	onMount(() => {
		el = element()
		if (!el) return

		sortable.set(
			new Sortable(el, {
				...restOptions,
				onStart(evt) {
					context = getUnderlyingItem(evt.item)
					evt.item._underlying_item_ = clone(context.element)
				},
				onAdd(evt) {
					const element: Item = evt.item._underlying_item_
					if (element === undefined) {
						return
					}

					removeNode(evt.item)
					if (typeof evt.newIndex === 'number') {
						spliceItems(evt.newIndex, 0, element)
					}
				},
				onRemove(evt) {
					insertNodeAt(el, evt.item, evt.oldIndex as number)

					if (evt.pullMode === 'clone') {
						removeNode(evt.clone)
						return
					}

					spliceItems(context.index, 1)
				},
				onUpdate(evt) {
					removeNode(evt.item)

					const oldIndex = evt.oldIndex as number
					const newIndex = evt.newIndex as number

					insertNodeAt(evt.from, evt.item, oldIndex)
					updatePosition(oldIndex, newIndex as number)

					onUpdated(newIndex, oldIndex)
				}
			})
		)
	})

	onDestroy(() => {
		getStoreValue(sortable)?.destroy()
	})

	return {
		subscribe: sortable.subscribe
	} as Readable<Sortable>
}
