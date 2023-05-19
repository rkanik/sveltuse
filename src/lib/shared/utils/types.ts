/**
 * Void function
 */
export type Fn = () => void

export interface Pausable {
	/**
	 * A ref indicate whether a pausable instance is active
	 */
	isActive: Readonly<boolean>

	/**
	 * Temporary pause the effect from executing
	 */
	pause: Fn

	/**
	 * Resume the effects
	 */
	resume: Fn
}
