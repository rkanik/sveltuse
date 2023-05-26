import type { Store } from 'sveltuse/types'

export default function isStore<S>(v: any): v is Store<S> {
	return typeof v === 'object' && 'subscribe' in v
}

export function isWritable<S>(v: any): v is Store<S> {
	return isStore(v) && 'set' in v
}

export function isReadable<S>(v: any): v is Store<S> {
	return isStore(v) && !('set' in v)
}
