import type { SvelteComponent } from 'svelte'
import type { Writable, Readable } from 'svelte/store'

export type Arrayable<T> = T[] | T

/**
 * Any function
 */
export type AnyFn = (...args: any[]) => any

export type Store<T> = Writable<T> | Readable<T>

export type MaybeGetter<T> = T | Store<T> | (() => T)

export type MaybeArray<T> = T | T[]

export interface Position {
	x: number
	y: number
}

export type FunctionArgs<Args extends any[] = any[], Return = void> = (
	...args: Args
) => Return

export interface FunctionWrapperOptions<
	Args extends any[] = any[],
	This = any
> {
	fn: FunctionArgs<Args, This>
	args: Args
	thisArg: This
}

export type EventFilter<
	Args extends any[] = any[],
	This = any,
	Invoke extends AnyFn = AnyFn
> = (
	invoke: Invoke,
	options: FunctionWrapperOptions<Args, This>
) => ReturnType<Invoke> | Promise<ReturnType<Invoke>>

export interface ConfigurableEventFilter {
	/**
	 * Filter for if events should to be received.
	 *
	 * @see https://vueuse.org/guide/config.html#event-filters
	 */
	eventFilter?: EventFilter
}

/**
 * Void function
 */
export type Fn = () => void

export interface Stoppable<StartFnArgs extends any[] = any[]> {
	/**
	 * A ref indicate whether a stoppable instance is executing
	 */
	isPending: Readable<boolean>

	/**
	 * Stop the effect from executing
	 */
	stop: Fn

	/**
	 * Start the effects
	 */
	start: (...args: StartFnArgs) => void
}

export type ArgumentsType<T> = T extends (...args: infer U) => any ? U : never

export type PromisifyFn<T extends AnyFn> = (
	...args: ArgumentsType<T>
) => Promise<ReturnType<T>>

export type Pausable = {
	/**
	 * A ref indicate whether a pausable instance is active
	 */
	isActive: Writable<boolean>

	/**
	 * Temporary pause the effect from executing
	 */
	pause: Fn

	/**
	 * Resume the effects
	 */
	resume: Fn
}

export type BlockQuoteType =
	| 'xs'
	| 'sm'
	| 'base'
	| 'lg'
	| 'xl'
	| '2xl'
	| '3xl'
	| '4xl'
	| '5xl'
	| '6xl'
	| '7xl'
	| '8xl'
	| '9xl'

export type ButtonType = 'button' | 'submit' | 'reset'

export type ButtonColorType =
	| 'alternative'
	| 'blue'
	| 'cyan'
	| 'dark'
	| 'light'
	| 'lime'
	| 'green'
	| 'pink'
	| 'primary'
	| 'red'
	| 'teal'
	| 'yellow'
	| 'purple'
	| 'purpleToBlue'
	| 'cyanToBlue'
	| 'greenToBlue'
	| 'purpleToPink'
	| 'pinkToOrange'
	| 'tealToLime'
	| 'redToYellow'

export type Colors =
	| 'blue'
	| 'gray'
	| 'red'
	| 'yellow'
	| 'purple'
	| 'green'
	| 'indigo'
	| 'pink'
	| 'white'
	| 'custom'
	| 'primary'
	| 'secondary'

export type ImgType = {
	src: string
	alt?: string
}

export type IndicatorColorType =
	| 'gray'
	| 'dark'
	| 'blue'
	| 'green'
	| 'red'
	| 'purple'
	| 'indigo'
	| 'yellow'
	| 'teal'
	| 'none'

export type IndicatorPlacementType =
	| 'top-left'
	| 'top-center'
	| 'top-right'
	| 'center-left'
	| 'center'
	| 'center-right'
	| 'bottom-left'
	| 'bottom-center'
	| 'bottom-right'
	| undefined

export type InputType =
	| 'color'
	| 'date'
	| 'datetime-local'
	| 'email'
	| 'file'
	| 'hidden'
	| 'image'
	| 'month'
	| 'number'
	| 'password'
	| 'reset'
	| 'submit'
	| 'tel'
	| 'text'
	| 'time'
	| 'url'
	| 'week'
	| 'search'

export type drawerTransitionTypes =
	| 'fade'
	| 'fly'
	| 'slide'
	| 'blur'
	| 'in:fly'
	| 'out:fly'
	| 'in:slide'
	| 'out:slide'
	| 'in:fade'
	| 'out:fade'
	| 'in:blur'
	| 'out:blur'
	| undefined

export type FormColorType =
	| 'blue'
	| 'red'
	| 'green'
	| 'purple'
	| 'teal'
	| 'yellow'
	| 'orange'
	| 'primary'
	| 'secondary'

export type ModalPlacementType =
	| 'top-left'
	| 'top-center'
	| 'top-right'
	| 'center-left'
	| 'center'
	| 'center-right'
	| 'bottom-left'
	| 'bottom-center'
	| 'bottom-right'

export type PsizeType =
	| 'xs'
	| 'sm'
	| 'base'
	| 'lg'
	| 'xl'
	| '2xl'
	| '3xl'
	| '4xl'
	| '5xl'
	| '6xl'
	| '7xl'
	| '8xl'
	| '9xl'

export type PweightType =
	| 'thin'
	| 'extralight'
	| 'light'
	| 'normal'
	| 'medium'
	| 'semibold'
	| 'bold'
	| 'extrabold'
	| 'black'

export type TableColorType =
	| 'blue'
	| 'green'
	| 'red'
	| 'yellow'
	| 'purple'
	| 'indigo'
	| 'pink'
	| 'default'
	| 'custom'

export type ToolbarColorType =
	| 'gray'
	| 'red'
	| 'yellow'
	| 'green'
	| 'indigo'
	| 'purple'
	| 'pink'
	| 'blue'
	| 'dark'
	| 'none'

export type ToolbarButtonType =
	| 'dark'
	| 'default'
	| 'gray'
	| 'red'
	| 'yellow'
	| 'green'
	| 'indigo'
	| 'purple'
	| 'pink'
	| 'blue'

export declare const xs = 'xs'
export declare const sm = 'sm'
export declare const md = 'md'
export declare const lg = 'lg'
export declare const xl = 'xl'
export declare type SizeType =
	| typeof xs
	| typeof sm
	| typeof md
	| typeof lg
	| typeof xl

export declare type FormSizeType = typeof sm | typeof md | typeof lg

export type ReviewType = {
	name: string
	imgSrc: string
	imgAlt: string
	address: string | undefined
	reviewDate: string | undefined
	title: string
	rating: number
	item1: string | undefined
	item2: string | undefined
	item3: string | undefined
}

export type SelectOptionType = {
	name: string | number
	value: string | number
}

export type TransitionTypes =
	| 'fade'
	| 'fly'
	| 'slide'
	| 'blur'
	| 'in:fly'
	| 'out:fly'
	| 'in:slide'
	| 'out:slide'
	| 'in:fade'
	| 'out:fade'
	| 'in:blur'
	| 'out:blur'

export interface ActivityType {
	title: HTMLElement | string
	date: Date | string
	src: string
	alt: string
	text?: HTMLElement | string
}

export interface drawerTransitionParamTypes {
	amount?: number
	delay?: number
	duration?: number
	easing?: (t: number) => number
	opacity?: number
	x?: number
	y?: number
}

export interface GroupTimelineType {
	title: string | HTMLElement
	src: string
	alt: string
	href?: string
	isPrivate?: boolean
	comment?: string | HTMLElement
}

export interface ListGroupItemType {
	current?: boolean
	disabled?: boolean
	href?: string
	[propName: string]: any
}

export interface LinkType {
	name: string
	href?: string
	rel?: string
	active?: boolean
}

export interface NavbarType {
	name: string
	href: string
	rel?: string
	child?: NavbarType[]
}

export interface SiteType {
	name: string
	href: string
	img?: string
}

export interface TimelineItemVerticalType {
	date: Date | string
	title: string
	icon?: typeof SvelteComponent
	iconSize?: number
	iconClass?: string
	href?: string
	linkname?: string
	text?: HTMLElement | string
}

export interface TimelineItemHorizontalType {
	date: Date | string
	title: string
	icon?: typeof SvelteComponent
	iconSize?: number
	iconClass?: string
	text?: HTMLElement | string
}

export interface TransitionParamTypes {
	delay?: number
	duration?: number
	easing?: (t: number) => number
	css?: (t: number, u: number) => string
	tick?: (t: number, u: number) => void
}

export interface ButtonClassesTypes {
	default?: string
	border?: string
	application?: string
	pagination?: string
	group?: string
	card?: string
	meeting?: string
	video?: string
	custom?: string
}
