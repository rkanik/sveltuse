export const isClient = typeof window !== 'undefined'
export const defaultWindow = isClient ? window : undefined
export const defaultDocument = isClient ? window.document : undefined
export const defaultNavigator = isClient ? window.navigator : undefined
