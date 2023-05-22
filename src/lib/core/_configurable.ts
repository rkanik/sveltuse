import { isClient } from '@shared'

export interface ConfigurableWindow {
	/*
	 * Specify a custom `window` instance, e.g. working with iframes or in testing environments.
	 */
	window?: Window
}

export interface ConfigurableDocument {
	/*
	 * Specify a custom `document` instance, e.g. working with iframes or in testing environments.
	 */
	document?: Document
}

export const defaultWindow = /*#__PURE__*/ isClient ? window : undefined
export const defaultDocument = /*#__PURE__*/ isClient
	? window.document
	: undefined
