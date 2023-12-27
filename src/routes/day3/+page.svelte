<script lang="ts">
	import equal from './equal';
	import not from './not';
	import weight from './weight';

	let { data } = $props();

	let packed = $state(data.packed);
	let unpacked = $state(data.unpacked);

	const packedWeight = $derived(weight(packed));
	const unpackedWeight = $derived(weight(unpacked));
</script>

<div class="grid grid-cols-2">
	<div>
		<p>{unpackedWeight}</p>
		<ul>
			{#each unpacked as present}
				{@const neq = not(equal(present))}
				<li>
					<button
						type="button"
						aria-label="add to packed presents"
						onclick={() => {
							unpacked = unpacked.filter(neq);
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
		<p>{packedWeight}</p>
		<ul>
			{#each packed as present}
				{@const neq = not(equal(present))}
				<li>
					<button
						type="button"
						aria-label="remove from packed presents"
						onclick={() => {
							packed = packed.filter(neq);
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
