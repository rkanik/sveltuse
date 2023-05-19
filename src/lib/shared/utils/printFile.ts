const printFile = async (url: string) => {
	const blobs = await fetch(url).then((r) => r.blob())
	const src = URL.createObjectURL(blobs)

	const iframe = document.createElement('iframe')

	iframe.onload = () => {
		setTimeout(() => {
			const onFocus = () => {
				iframe.remove()
				URL.revokeObjectURL(src)
				window.removeEventListener('focus', onFocus)
			}
			window.addEventListener('focus', onFocus)

			iframe.focus()
			iframe.contentWindow?.print()
		}, 1)
	}

	iframe.setAttribute('src', src)
	iframe.setAttribute('style', 'display:none')

	document.body.appendChild(iframe)
}

export default printFile
