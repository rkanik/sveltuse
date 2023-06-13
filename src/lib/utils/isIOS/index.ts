export const isIOS = () => {
	return (
		typeof window !== 'undefined' &&
		/*#__PURE__*/ window?.navigator?.userAgent &&
		/*#__PURE__*/ /iP(ad|hone|od)/.test(
			/*#__PURE__*/ window.navigator.userAgent
		)
	)
}
