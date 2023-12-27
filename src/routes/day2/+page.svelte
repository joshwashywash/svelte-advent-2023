<script lang="ts">
	import clamp from '$lib/math/clamp';

	let count = $state(0);

	const x = 10;
	const y = x;
	const r = x / 30;
	const f = x / 3;
	const g = y / 3;
	const eyeLeftX = f;
	const eyeRightX = 2 * f;
	const eyeDiffX = eyeRightX - eyeLeftX;
	const eyeY = f;
	const eyeMidX = 0.5 * (eyeLeftX + eyeRightX);

	const half = 0.5 * 10;
	const min = -half;
	const max = half;

	const c = clamp(min, max);

	const controlPointMouthY = $derived(c(count));

	const mouthLeftX = 2 * g;
	const controlPointMouthX = mouthLeftX - eyeMidX;

	const viewBox = $derived(`0 0 ${x} ${y}`);
	const d = $derived(
		`m ${eyeLeftX} ${mouthLeftX} q ${controlPointMouthX} ${controlPointMouthY} ${eyeDiffX} 0`
	);
</script>

<p>{count}</p>

<div class="flex flex-row gap-1">
	<button
		type="button"
		aria-label="increase the count"
		onclick={() => {
			count += 1;
		}}
	>
		+
	</button>

	<button
		type="button"
		aria-label="decrease the count"
		onclick={() => {
			count -= 1;
		}}
	>
		-
	</button>

	<button
		type="button"
		onclick={() => {
			count = 0;
		}}
	>
		reset
	</button>
</div>

<svg {viewBox} width={400} height={400}>
	<circle cx={eyeLeftX} cy={eyeY} {r} />
	<circle cx={eyeRightX} cy={eyeY} {r} />
	<path {d} fill="none" stroke="black" stroke-width={r} />
</svg>
