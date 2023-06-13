import { get_store_value, noop, onDestroy } from 'svelte/internal'
import {
	derived,
	writable,
	type Readable,
	type Unsubscriber
} from 'svelte/store'

type Pagination = {
	page: number
	total: number
	perPage: number
	totalVisible: number
}

type ChangeEvent = Pick<Pagination, 'page' | 'perPage'>

type InnerPagination = Pagination & { maxButtons: number }

const range = (from: number, to: number) => {
	const range = []
	from = from > 0 ? from : 1
	for (let i = from; i <= to; i++) {
		range.push(i)
	}
	return range
}

const getPages = ({
	page,
	total,
	perPage,
	maxButtons,
	totalVisible
}: InnerPagination) => {
	const length = Math.ceil(total / perPage)

	if (
		totalVisible === 0 ||
		isNaN(length) ||
		length > Number.MAX_SAFE_INTEGER
	) {
		return []
	}

	const maxLength = Math.min(
		Math.max(0, totalVisible) || length,
		Math.max(0, maxButtons) || length,
		length
	)

	if (length <= maxLength) {
		return range(1, length)
	}

	const even = maxLength % 2 === 0 ? 1 : 0
	const left = Math.floor(maxLength / 2)
	const right = length - left + 1 + even

	if (page > left && page < right) {
		const firstItem = 1
		const lastItem = length
		const start = page - left + 2
		const end = page + left - 2 - even
		const secondItem = start - 1 === firstItem + 1 ? 2 : '...'
		const beforeLastItem = end + 1 === lastItem - 1 ? end + 1 : '...'

		return [1, secondItem, ...range(start, end), beforeLastItem, length]
	} else if (page === left) {
		const end = page + left - 1 - even
		return [...range(1, end), '...', length]
	} else if (page === right) {
		const start = page - left + 1
		return [1, '...', ...range(start, length)]
	} else {
		return [...range(1, left), '...', ...range(right, length)]
	}
}

const toPagination = (v?: Partial<Pagination>): Pagination => {
	return {
		page: v?.page ?? 1,
		total: v?.total ?? 10,
		perPage: v?.perPage ?? 10,
		totalVisible: v?.totalVisible ?? 10
	}
}

type UseOffsetPaginationPayload = Partial<Pagination> & {
	onChange?: (event: ChangeEvent) => unknown
}

export const useOffsetPagination = (payload?: UseOffsetPaginationPayload) => {
	const maxButtons = writable(0)
	const initialPagination = toPagination(payload)

	const { onChange = noop } = payload || {}

	const page = writable(initialPagination.page)
	const total = writable(initialPagination.total)
	const perPage = writable(initialPagination.perPage)
	const totalVisible = writable(initialPagination.totalVisible)

	const event = derived([page, perPage], ([page, perPage]) => ({
		page,
		perPage
	}))

	const lastPage = derived([total, perPage], ([$total, $perPage]) => {
		return Math.ceil($total / $perPage)
	})

	const pagination = derived(
		[page, total, perPage, totalVisible],
		([$page, $total, $perPage, $totalVisible]) => {
			return {
				page: $page,
				total: $total,
				perPage: $perPage,
				totalVisible: $totalVisible
			}
		}
	)

	const isFirstPage = derived(page, ($page) => {
		return $page <= 1
	})

	const isLastPage = derived([page, lastPage], ([$page, $lastPage]) => {
		return $page >= $lastPage
	})

	const pages = writable(
		getPages({
			...initialPagination,
			maxButtons: get_store_value(maxButtons)
		})
	)

	const gotoFirstPage = () => {
		page.update(() => 1)
	}

	const gotoPreviousPage = () => {
		page.update((page) => {
			return page > 2 ? page - 1 : page
		})
	}

	const goto = (pageNumber: number | string) => {
		const _pageNumber = +pageNumber
		if (!isNaN(_pageNumber) && _pageNumber !== get_store_value(page)) {
			page.set(_pageNumber)
		}
	}

	const gotoNextPage = () => {
		page.update((page) => {
			const $lastPage = get_store_value(lastPage)
			return page < $lastPage ? page + 1 : page
		})
	}

	const gotoLastPage = () => {
		page.update(() => {
			return get_store_value(lastPage)
		})
	}

	const unSubscribers: Unsubscriber[] = []

	unSubscribers.push(event.subscribe(onChange))

	unSubscribers.push(
		pagination.subscribe(($pagination) => {
			pages.set(
				getPages({
					...$pagination,
					maxButtons: get_store_value(maxButtons)
				})
			)
		})
	)

	onDestroy(() => {
		unSubscribers.forEach((unsubscribe) => {
			unsubscribe()
		})
	})

	return {
		page,
		perPage,
		total,
		lastPage,
		totalVisible,
		isFirstPage,
		isLastPage,

		// Methods
		gotoFirstPage,
		gotoPreviousPage,
		goto,
		gotoNextPage,
		gotoLastPage,

		pages: pages as Readable<(string | number)[]>
	}
}
