<script lang="ts">
	import type { Person } from './types';
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	$effect(() => {
		if (form?.person !== undefined) {
			data.people.push(form.person);
			form = null;
		}
	});

	const nice = $derived(data.people.toSorted((a, b) => b.tally - a.tally));
	const naughty = $derived(nice.toReversed());
	const average = $derived(
		data.people.reduce((sum, person) => sum + person.tally, 0) / data.people.length
	);

	const sortMethods = ['nice', 'naughty'] as const;

	type SortMethod = (typeof sortMethods)[number];

	const sorts = $derived<Record<SortMethod, Person[]>>({
		nice,
		naughty
	});

	let sortMethod = $state<SortMethod>('nice');

	const people = $derived(sorts[sortMethod]);
</script>

<p>average {average}</p>

<div class="grid grid-cols-2">
	<form method="POST" use:enhance class="flex flex-col gap-2">
		{#if form?.missing === 'name'}
			<p>`name` was missing in form submission</p>
		{/if}
		<label class:text-red-400={form?.missing === 'name'}>
			name
			<input name="name" required />
		</label>
		{#if form?.missing === 'tally'}
			<p>`tally` was missing in form submission</p>
		{/if}
		<label class:text-red-400={form?.missing === 'tally'}>
			tally
			<input type="number" name="tally" required />
		</label>
		<button>submit</button>
	</form>

	<table class="table-auto">
		<thead>
			<tr>
				<th>name</th>
				<th>tally</th>
			</tr>
		</thead>
		<tbody>
			{#each people as person}
				<tr>
					<td>{person.name}</td>
					<td>{person.tally}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
