<script lang="ts">
	import equal from './equal';
	import not from './not';
	import weight from './weight';

	let { data } = $props();

	let packed = $state(data.packed);
	let unpacked = $state(data.unpacked);

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
						aria-label="add to packed presents"
						onclick={() => {
							unpacked = unpacked.filter(not(equal(present)));
							packed.push(present);
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
			<span class:text-green-400={!overweight} class:text-red-400={overweight}>{packedWeight}</span>
		</p>
		<ul>
			{#each packed as present}
				<li>
					<button
						type="button"
						aria-label="remove from packed presents"
						onclick={() => {
							packed = packed.filter(not(equal(present)));
							unpacked.push(present);
						}}
					>
						{present.name}: {present.weight}
					</button>
				</li>
			{/each}
		</ul>
	</div>
</div>
