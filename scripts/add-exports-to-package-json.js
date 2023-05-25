import fs from 'fs'
import path from 'path'

const distDir = './dist'
const packageJsonPath = './package.json'

const toPath = (path = '', pre = '', post = '') => {
	return pre + path.replaceAll('\\', '/') + post
}

const getFunctions = (filter, map) => {
	return fs.readdirSync(distDir).reduce((functions, file) => {
		const baseDir = path.join(distDir, file)
		if (!fs.existsSync(baseDir) || !fs.lstatSync(baseDir).isDirectory()) {
			return functions
		}
		return functions.concat(
			fs
				.readdirSync(baseDir)
				.filter((v) => filter(v))
				.map((v) => map(v, path.join(baseDir, v)))
		)
	}, [])
}

const getUseFunctions = () => {
	return getFunctions(
		(file) => file.startsWith('use'),
		(functionName, fullPath) => ({
			key: `./${functionName}`,
			types: toPath(path.join(fullPath, 'index.d.ts'), './'),
			svelte: toPath(path.join(fullPath, 'index.js'), './')
		})
	)
}

const exports = {}

for (const useFn of getUseFunctions()) {
	exports[useFn.key] = {
		types: useFn.types,
		svelte: useFn.svelte
	}
}

const indexDtsPath = path.join(distDir, 'index.d.ts')
if (fs.existsSync(indexDtsPath) && fs.lstatSync(indexDtsPath).isFile()) {
	exports['.'] = {
		types: './dist/index.d.ts',
		svelte: './dist/index.js'
	}
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

packageJson.exports = exports
// console.log(JSON.stringify(exports, null, 2))

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 3))
