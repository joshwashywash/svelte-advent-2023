<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { url } from './constants';

	let { data } = $props();

	$effect(() => {
		const interval = setInterval(() => {
			invalidateAll();
		}, 2000);
		return () => {
			clearInterval(interval);
		};
	});
</script>

<p>{data.heartRate}</p>
