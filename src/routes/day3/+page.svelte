<script lang="ts">
	import weight from './weight';
	import { SvelteSet } from 'svelte/reactivity';

	let { data } = $props();

	let packed = new SvelteSet(data.packed);
	let unpacked = new SvelteSet(data.unpacked);

	const packedWeight = $derived(weight(packed));
	const unpackedWeight = $derived(weight(unpacked));

	const overweight = $derived(packedWeight > data.maxWeight);
</script>

<div class="grid grid-cols-2">
	<div>
		<p>unpacked weight: {unpackedWeight}</p>
		<ul>
			{#each unpacked as present}
				<li>
					<button
						disabled={overweight}
						type="button"
						aria-label={`add ${present.name}'s present to the packed presents`}
						onclick={() => {
							if (unpacked.delete(present)) {
								packed.add(present);
							}
						}}
					>
						{present.name}: {present.weight}
					</button>
				</li>
			{/each}
		</ul>
	</div>
	<div>
		<p>
			packed weight:
			<span class:text-green-400={!overweight} class:text-red-400={overweight}
				>{packedWeight}</span
			>
		</p>
		<ul>
			{#each packed as present}
				<li>
					<button
						type="button"
						aria-label={`remove ${present.name}'s present from the packed presents`}
						onclick={() => {
							if (packed.delete(present)) {
								unpacked.add(present);
							}
						}}
					>
						{present.name}: {present.weight}
					</button>
				</li>
			{/each}
		</ul>
	</div>
</div>
