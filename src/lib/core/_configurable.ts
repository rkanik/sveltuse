export interface ConfigurableNavigator {
	/*
	 * Specify a custom `navigator` instance, e.g. working with iframes or in testing environments.
	 */
	navigator?: Navigator
}

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
