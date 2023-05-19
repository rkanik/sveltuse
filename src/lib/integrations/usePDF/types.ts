type TPage = {
	scale: number
	number: number
	canvas: HTMLCanvasElement
	container: HTMLDivElement
	isRendered: boolean
	isRendering: boolean
	textLayout?: HTMLDivElement
}

type TMiniPage = {
	width: number
	number: number
	isRendered: boolean
	canvas: HTMLCanvasElement
}

type TPageOrNot = TPage | undefined
