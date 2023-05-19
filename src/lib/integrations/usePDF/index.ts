import { onMount } from 'svelte'
import { useIntersectionObserver } from '$lib/core'
import { writable, type Writable } from 'svelte/store'

import printFile from '@shared/utils/printFile'
import downloadFile from '@shared/utils/downloadFile'

type UsePDFOptions = {
	src: string
	pdfjs: any
	workerSrc: string
	filename?: string

	// scale
	maxScale?: number
	minScale?: number
	initialScale?: number
	scaleFactor?: number

	// viewport
	initialViewport?: {
		scale: number
		width: number
		height: number
	}

	// elements
	pagesContainerGetter?: () => HTMLElement
}

const getWritable = <T>(w: Writable<T>): T => {
	let v
	w.subscribe(($v) => {
		v = $v
	})()
	return v as T
}

export default function usePDF(options: UsePDFOptions) {
	let {
		src,
		pdfjs,
		workerSrc,
		filename = src.split('/').pop(),

		// scale
		maxScale = 3.1,
		minScale = 0.25,
		initialScale = 1.5,
		scaleFactor = 0.2,

		// viewport
		initialViewport = {
			scale: 1,
			width: 500,
			height: 500 * 1.414
		},

		// elements
		pagesContainerGetter
	} = options

	pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

	const { onIntersect } = useIntersectionObserver()

	const scale = writable(initialScale)
	const getScale = () => getWritable(scale)

	const numPages = writable(0)
	const getNumPages = () => getWritable(numPages)

	const pdf = writable<any>()
	const getPDF = () => getWritable(pdf)

	const viewport = writable(initialViewport)
	const getViewport = () => getWritable(viewport)

	const pageNumber = writable(1)
	const getPageNumber = () => getWritable(pageNumber)

	let pages: TPage[] = []
	let pageNumbers = writable<number[]>([])
	let isScrollingPagesElement = false

	const setPage = (
		number: number,
		updater: TPage | ((page?: TPage) => TPage)
	) => {
		let clonedPages = [...pages]

		let page = clonedPages.find((page) => {
			return page?.number === number
		})

		if (!page) {
			clonedPages[number] =
				typeof updater === 'function' ? updater(page) : updater
		}

		clonedPages = clonedPages.map((item) => {
			if (item?.number !== number) return item
			if (typeof updater === 'function') {
				page = updater(item)
				return page
			}
			return updater
		})

		pages = [...clonedPages]
		return page as TPage
	}

	const getPage = <P extends TPageOrNot>(
		number: number,
		page?: P
	): P extends undefined ? TPageOrNot : TPage => {
		const existedPage = pages.find((page) => {
			return page?.number === number
		})

		if (!existedPage && page) {
			setPage(number, page)
			return page
		}

		return existedPage as any
	}

	const onRenderPage = (event: TPage) => {
		if (event.isRendering) return

		setPage(event.number, (v = event) => ({
			...v,
			isRendering: true
		}))

		// Using promise to fetch the page
		getPDF()
			.getPage(event.number)
			.then(async (page: any) => {
				let innerScale = getScale() || event.scale || 1
				let innerViewport = page.getViewport({ scale: innerScale })

				let $viewport = getViewport()
				if (!$viewport || $viewport.scale !== innerScale) {
					viewport.set(innerViewport)
				}

				event.canvas.width = innerViewport.width
				event.canvas.height = innerViewport.height

				const renderTask = page.render({
					viewport: innerViewport,
					canvasContext: event.canvas.getContext('2d')
				})

				await renderTask.promise

				event.canvas.setAttribute('data-rendered', 'true')
				setPage(event.number, (v = event) => {
					return {
						...v,
						isRendered: true,
						isRendering: false,
						scale: innerScale
					}
				})

				if (event.textLayout) {
					pdfjs.renderTextLayer({
						textDivs: [],
						viewport: innerViewport,
						container: event.textLayout,
						textContentSource: await page.getTextContent()
					})
				}
			})
	}

	const intersectionRatios = writable<number[]>([])
	intersectionRatios.subscribe((v) => {
		if (!isScrollingPagesElement && v.length > 0) {
			const maybePageNumber = v.indexOf(Math.max(...v.filter(Boolean)))
			if (getPageNumber() !== maybePageNumber) {
				pageNumber.set(maybePageNumber)
			}
		}
	})

	const pageRenderer = (
		container: HTMLDivElement,
		config: {
			number: number
		}
	) => {
		const { number } = config

		const canvas = container.querySelector('canvas') as HTMLCanvasElement
		const newPage = setPage(number, {
			scale: getScale(),
			number,
			canvas,
			container,
			isRendered: false,
			isRendering: false,
			textLayout: canvas.nextElementSibling as HTMLDivElement | undefined
		})

		onIntersect(container, {
			onEnter(entries) {
				const page = getPage(number, newPage)
				if (!page.isRendered) onRenderPage(page)

				intersectionRatios.update(($v) => {
					$v[number] = entries[0].intersectionRatio
					return $v
				})
			},
			onLeave() {
				intersectionRatios.update(($v) => {
					$v[number] = 0
					return $v
				})
			}
		})
	}

	// THUMBNAIL
	const onRenderThumbnail = (page: TMiniPage) => {
		getPDF()
			.getPage(page.number)
			.then(async (pdfPage: any) => {
				const scale = page.width / pdfPage.getViewport({ scale: 1 }).width
				const viewport = pdfPage.getViewport({ scale })

				page.canvas.width = viewport.width
				page.canvas.height = viewport.height

				const renderTask = pdfPage.render({
					viewport,
					canvasContext: page.canvas.getContext('2d')
				})

				renderTask.promise
			})
	}

	const thumbnailRenderer = (
		container: HTMLElement,
		config: {
			width?: number
			number: number
		}
	) => {
		onIntersect(container, {
			onEnter(_, observer) {
				observer.unobserve(container)
				onRenderThumbnail({
					isRendered: false,
					number: config.number,
					width: config.width || 120,
					canvas: container.querySelector('canvas') as HTMLCanvasElement
				})
			}
		})
	}
	// END THUMBNAIL

	const onSetPageNumber = (number: number) => {
		const page = getPage(number)
		if (!page) return

		pageNumber.set(number)

		if (!pagesContainerGetter) {
			window.addEventListener('scroll', () => {
				console.log('window.scroll')
			})
			page.container.scrollIntoView({
				behavior: 'smooth'
			})
			return
		}

		let timeout: NodeJS.Timeout
		let container = pagesContainerGetter()

		const onScroll = () => {
			clearTimeout(timeout)
			timeout = setTimeout(() => {
				isScrollingPagesElement = false
				container.addEventListener('scroll', onScroll)
			}, 200)
		}

		container.addEventListener('scroll', onScroll)

		isScrollingPagesElement = true
		container.scroll({
			behavior: 'smooth',
			top: page.container.offsetTop - container.offsetTop - 20
		})
	}

	const goToNextPage = () => {
		const pageNumber = getPageNumber()
		if (pageNumber + 1 <= getNumPages()) {
			onSetPageNumber(pageNumber + 1)
		}
	}

	const goToPreviousPage = () => {
		const pageNumber = getPageNumber()
		if (pageNumber - 1 > 0) {
			onSetPageNumber(pageNumber - 1)
		}
	}

	const onChangeScale = () => {
		pages.forEach((page) => {
			if (page?.isRendered) {
				onRenderPage({
					...page,
					scale: getScale()
				})
			}
		})
	}

	const zoomIn = () => {
		const v = getScale()
		if (v + scaleFactor > maxScale) return
		scale.set(v + scaleFactor)
		onChangeScale()
	}

	const zoomOut = () => {
		const v = getScale()
		if (v - scaleFactor < minScale) return
		scale.set(v - scaleFactor)
		onChangeScale()
	}

	const download = (name?: string) => {
		downloadFile({
			src,
			filename: name || filename
		})
	}

	const print = () => {
		printFile(src)
	}

	onMount(() => {
		pdfjs.getDocument(src).promise.then((v: any) => {
			pdf.set(v)
			numPages.set(v.numPages)
			pageNumbers.set(
				[...Array(v.numPages).keys()].map((index) => index + 1)
			)
		})
	})

	return {
		pdf,
		scale,
		viewport,
		numPages,
		pageNumber,
		pageNumbers,
		goToNextPage,
		goToPreviousPage,
		pageRenderer,
		thumbnailRenderer,
		zoomIn,
		zoomOut,
		download,
		print
	}
}
