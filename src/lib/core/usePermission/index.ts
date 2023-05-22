// Ported from https://vueuse.org/core/usePermission

import type { ConfigurableNavigator } from '../_configurable'

import { onDestroy } from 'svelte'
import { defaultNavigator } from 'sveltuse/constants'
import { writable, type Readable } from 'svelte/store'

import toValue from 'sveltuse/utils/toValue'
import createSingletonPromise from 'sveltuse/utils/createSingletonPromise'
import { useIsSupported } from '../useIsSupported'

type DescriptorNamePolyfill =
	| 'accelerometer'
	| 'accessibility-events'
	| 'ambient-light-sensor'
	| 'background-sync'
	| 'camera'
	| 'clipboard-read'
	| 'clipboard-write'
	| 'gyroscope'
	| 'magnetometer'
	| 'microphone'
	| 'notifications'
	| 'payment-handler'
	| 'persistent-storage'
	| 'push'
	| 'speaker'

export type GeneralPermissionDescriptor =
	| PermissionDescriptor
	| { name: DescriptorNamePolyfill }

export interface UsePermissionOptions<Controls extends boolean>
	extends ConfigurableNavigator {
	/**
	 * Expose more controls
	 *
	 * @default false
	 */
	controls?: Controls
}

export type UsePermissionReturn = Readable<PermissionState | undefined>
export interface UsePermissionReturnWithControls {
	state: UsePermissionReturn
	isSupported: Readable<boolean>
	query: () => Promise<PermissionStatus | undefined>
}

/**
 * Reactive Permissions API.
 *
 * @see https://sveltuse.pages.dev/docs/functions/usePermission
 */
export function usePermission(
	permissionDesc:
		| GeneralPermissionDescriptor
		| GeneralPermissionDescriptor['name'],
	options?: UsePermissionOptions<false>
): UsePermissionReturn
export function usePermission(
	permissionDesc:
		| GeneralPermissionDescriptor
		| GeneralPermissionDescriptor['name'],
	options: UsePermissionOptions<true>
): UsePermissionReturnWithControls
export function usePermission(
	permissionDesc:
		| GeneralPermissionDescriptor
		| GeneralPermissionDescriptor['name'],
	options: UsePermissionOptions<boolean> = {}
): UsePermissionReturn | UsePermissionReturnWithControls {
	const { controls = false, navigator = defaultNavigator } = options

	const permissionStatus = writable<PermissionStatus>()

	const desc =
		typeof permissionDesc === 'string'
			? ({ name: permissionDesc } as PermissionDescriptor)
			: (permissionDesc as PermissionDescriptor)

	const state = writable<PermissionState | undefined>()

	const onChange = () => {
		const status = toValue(permissionStatus)
		if (status) state.set(status.state)
	}

	const query = createSingletonPromise(async () => {
		if (toValue(permissionStatus)) {
			return toValue(permissionStatus)
		}

		try {
			permissionStatus.set(await navigator!.permissions.query(desc))
			toValue(permissionStatus).addEventListener('change', onChange)
			onChange()
		} catch {
			state.set('prompt')
		}
	})

	const isSupported = useIsSupported(() => {
		query()
	})

	onDestroy(() => {
		toValue(permissionStatus)?.removeEventListener('change', onChange)
	})

	if (controls) {
		return {
			state: state as UsePermissionReturn,
			isSupported,
			query
		}
	} else {
		return state as UsePermissionReturn
	}
}
