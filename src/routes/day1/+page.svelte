<script lang="ts">
	import type { Person } from './types';
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	let people = $derived(data.people);

	const nice = $derived(people.toSorted((a, b) => b.tally - a.tally));
	const naughty = $derived(nice.toReversed());
	const average = $derived(
		people.reduce((sum, person) => sum + person.tally, 0) / people.length,
	);

	const sortBys = ['nice', 'naughty'] as const;

	type SortBy = (typeof sortBys)[number];

	const sorts = $derived<Record<SortBy, Person[]>>({
		nice,
		naughty,
	});

	let sortBy = $state<SortBy>('nice');

	const createSortBy = (s: SortBy) => () => {
		sortBy = s;
	};

	const sortByNice = createSortBy('nice');
	const sortByNaughty = createSortBy('naughty');

	const sorted = $derived(sorts[sortBy]);

	let sortedByNice = $derived(sortBy === 'nice');
	let sortedByNaughtiness = $derived(sortBy === 'naughty');
</script>

<p>average {average}</p>

<button
	type="button"
	disabled={sortedByNice}
	onclick={sortByNice}
	aria-label="sort people by niceness"
>
	nice
</button>
<button
	type="button"
	disabled={sortedByNaughtiness}
	onclick={sortByNaughty}
	aria-label="sort people by naughtiness"
>
	naughty
</button>

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
			{#each sorted as person}
				<tr>
					<td>{person.name}</td>
					<td>{person.tally}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
