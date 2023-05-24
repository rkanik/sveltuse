<!-- 1 -->
<script setup lang="ts">
	import { usePermission } from 'sveltuse'

	const accelerometer = usePermission('accelerometer')
	const accessibilityEvents = usePermission('accessibility-events')
	const ambientLightSensor = usePermission('ambient-light-sensor')
	const backgroundSync = usePermission('background-sync')
	const camera = usePermission('camera')
	const clipboardRead = usePermission('clipboard-read')
	const clipboardWrite = usePermission('clipboard-write')
	const gyroscope = usePermission('gyroscope')
	const magnetometer = usePermission('magnetometer')
	const microphone = usePermission('microphone')
	const notifications = usePermission('notifications')
	const paymentHandler = usePermission('payment-handler')
	const persistentStorage = usePermission('persistent-storage')
	const push = usePermission('push')
	const speaker = usePermission('speaker')

	let permissions = {}

	$: {
		permissions = {
			accelerometer: $accelerometer,
			accessibilityEvents: $accessibilityEvents,
			ambientLightSensor: $ambientLightSensor,
			backgroundSync: $backgroundSync,
			camera: $camera,
			clipboardRead: $clipboardRead,
			clipboardWrite: $clipboardWrite,
			gyroscope: $gyroscope,
			magnetometer: $magnetometer,
			microphone: $microphone,
			notifications: $notifications,
			paymentHandler: $paymentHandler,
			persistentStorage: $persistentStorage,
			push: $push,
			speaker: $speaker
		}
	}

	speaker
</script>

<pre><code>{JSON.stringify(permissions, null, 2)}</code></pre>
