export const load = async ({ fetch }) => {
	try {
		const url =
			'https://raw.githubusercontent.com/rkanik/sveluse/main/package.json'
		const pck = await fetch(url).then((r) => r.json())

		return { package: pck }
	} catch (error) {
		console.error(`Error in load function for /: ${error}`)
	}
}
