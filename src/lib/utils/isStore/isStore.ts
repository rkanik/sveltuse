import type { Store } from 'sveltuse/types'

export default function isStore<S>(v: any): v is Store<S> {
	return 'subscribe' in v
}
