export default function sleep(timeout = 1000) {
	return new Promise((resolve) => {
		return setTimeout(resolve, timeout)
	})
}
