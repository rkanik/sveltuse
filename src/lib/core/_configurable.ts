import { isClient } from '@shared'

export interface ConfigurableWindow {
	/*
	 * Specify a custom `window` instance, e.g. working with iframes or in testing environments.
	 */
	window?: Window
}

export const defaultWindow = /*#__PURE__*/ isClient ? window : undefined
