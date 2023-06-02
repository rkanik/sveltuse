import 'darkreader/index.d.ts'
import type { DynamicThemeFix, Theme } from 'darkreader'

import { useScriptTag } from 'sveltuse/core'
import { writable, type Readable } from 'svelte/store'

type Options = {
	persist?: boolean
	theme?: Partial<Theme>
	fixes?: DynamicThemeFix
}

export function useDarkReader(options?: Options) {
	const { persist = true, theme = {}, fixes } = options || {}

	const isDark = writable(false)

	const isEnabled = () => {
		return window.DarkReader.isEnabled()
	}

	const onChange = () => {
		if (persist) {
			window.localStorage.setItem('darkreader', isEnabled().toString())
		}
	}

	const toggle = (dark?: boolean) => {
		dark = dark === undefined ? isEnabled() : !dark
		;(dark ? window.DarkReader.disable : window.DarkReader.enable)(
			theme,
			fixes
		)

		onChange()
		isDark.set(isEnabled())
	}

	useScriptTag('https://unpkg.com/darkreader@4.9.58/darkreader.js', () => {
		DarkReader.setFetchMethod(window.fetch)

		const localDarkReader = localStorage.getItem('darkreader')
		if (['true', true, '1', 1].includes(localDarkReader || '')) {
			toggle(true)
		}
	})

	return {
		toggle,
		isDark: {
			subscribe: isDark.subscribe
		} as Readable<boolean>
	}
}
