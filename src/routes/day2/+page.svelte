<script lang="ts">
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

	const mouthLeftX = 2 * g;
	const controlPointMouthX = mouthLeftX - eyeMidX;

	const viewBox = `0 0 ${x} ${y}`;
	const d = $derived(
		`m ${eyeLeftX} ${mouthLeftX} q ${controlPointMouthX} ${count} ${eyeDiffX} 0`,
	);

	const atMax = $derived(count === max);
	const atMin = $derived(count === min);
</script>

<p>{count}</p>

<div class="flex flex-row gap-1">
	<button
		type="button"
		aria-label="increase the count"
		onclick={() => {
			count += 1;
		}}
		disabled={atMax}
	>
		+
	</button>

	<button
		type="button"
		aria-label="decrease the count"
		onclick={() => {
			count -= 1;
		}}
		disabled={atMin}
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
