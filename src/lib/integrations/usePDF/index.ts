const usePDF = () => {
	return {
		renderer(el: Node) {
			console.log('usePDFRenderer', el)
		}
	}
}

export default usePDF
