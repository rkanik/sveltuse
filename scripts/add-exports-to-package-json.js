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
			keys: [`./${functionName}`, toPath(fullPath, './')],
			types: toPath(path.join(fullPath, 'index.d.ts'), './'),
			default: toPath(path.join(fullPath, 'index.js'), './')
		})
	)
}

const getComponents = () => {
	return getFunctions(
		(file) => file.endsWith('.svelte'),
		(componentName, fullPath) => ({
			keys: [`./${componentName}`, toPath(fullPath, './')],
			types: toPath(fullPath, './', '.d.ts'),
			svelte: toPath(fullPath, './')
		})
	)
}

const exports = {}

for (const useFn of getUseFunctions()) {
	const exportObject = {
		types: useFn.types,
		default: useFn.default
	}
	for (const key of useFn.keys) {
		exports[key] = exportObject
	}
}

const directFolders = ['components', 'integrations', 'directives']
for (const folder of directFolders) {
	const exportObject = {
		types: toPath(path.join(distDir, folder, 'index.d.ts'), './'),
		default: toPath(path.join(distDir, folder, 'index.js'), './')
	}
	exports[`./${folder}`] = exportObject
	exports[`./dist/${folder}`] = exportObject
}

const indexDtsPath = path.join(distDir, 'index.d.ts')
if (fs.existsSync(indexDtsPath) && fs.lstatSync(indexDtsPath).isFile()) {
	exports['.'] = {
		types: './dist/index.d.ts',
		svelte: './dist/index.js',
		default: './dist/index.js'
	}
}

for (const component of getComponents()) {
	const exportObject = {
		types: component.types,
		default: component.default,
		svelte: component.svelte
	}
	for (const key of component.keys) {
		exports[key] = exportObject
	}
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

packageJson.exports = exports
// console.log(JSON.stringify(exports, null, 2))

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4))
