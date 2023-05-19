type Config = {
	src?: string
	base64?: string
	filename?: string
}

const downloadFile = async (config?: Config): Promise<void> => {
	let { src, filename } = config || {}
	const { base64 } = config || {}

	if (!src && !base64) {
		console.error(
			'Either `src` or `base64` is required to download the file.'
		)
		return
	}

	if (!filename) {
		filename = src?.substring(src.lastIndexOf('/') + 1) || 'download.pdf'
	}

	const link = document.createElement('a')

	if (!src) {
		src = `data:application/pdf;base64,${btoa(base64 as string)}`
	}

	const blobs = await fetch(src).then((r) => r.blob())
	if (!blobs || !(blobs instanceof Blob)) {
		console.error('Invalid blob object passed to URL.createObjectURL()')
		return
	}

	if (typeof URL.createObjectURL === 'undefined') {
		console.error('Your browser does not support URL.createObjectURL()')
	}

	const url = URL.createObjectURL(blobs)

	link.download = filename
	link.rel = 'noopener'
	link.href = url

	link.click()
	URL.revokeObjectURL(link.href)
}

export default downloadFile
