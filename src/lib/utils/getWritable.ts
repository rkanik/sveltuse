import type { Readable, Writable } from 'svelte/store'

export function getWritable<T>(w: Writable<T> | Readable<T>): T {
	let v
	w.subscribe(($v) => {
		v = $v
	})()
	return v as T
}
