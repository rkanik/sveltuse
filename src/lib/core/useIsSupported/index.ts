import anonymous from 'sveltuse/utils/anonymous'
import { useSupported } from '../useSupported'

export function useIsSupported(checker: () => unknown, callback = anonymous) {
	const is = useSupported(checker)

	const unsubscribe = is.subscribe((v) => {
		if (v) {
			callback()
			unsubscribe()
		}
	})

	return is
}
