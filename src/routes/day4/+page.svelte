<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { url } from './constants';

	let { data } = $props();

	$effect(() => {
		const interval = setInterval(() => {
			invalidate(url);
		}, 2000);
		return () => {
			clearInterval(interval);
		};
	});
</script>

<p>{data.heartRate}</p>
