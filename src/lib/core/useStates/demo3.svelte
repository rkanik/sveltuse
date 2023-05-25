<script lang="ts">
	import { useStates } from 'sveltuse'

	enum Status {
		Active,
		Pending,
		InProgress,
		Cancelled
	}

	const currentStatus = useStates(Status, Status.Active)
	currentStatus.set(Status.InProgress)
	currentStatus.set((v) => v.Cancelled)

	const colors = ['red', 'green', 'blue'] as const
	const currentColor = useStates(colors, 'red')
	console.log($currentColor) // red

	currentColor.set('green')
	console.log($currentColor) // green
</script>
