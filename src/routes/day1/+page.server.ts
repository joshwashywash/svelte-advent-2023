import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const url = 'https://advent.sveltesociety.dev/data/2023/day-one.json';

const added: Person[] = [];

export const load: PageServerLoad = async (event) => {
	const people: Person[] = await event
		.fetch(url, { method: 'GET' })
		.then((response) => response.json());

	return {
		people: people.concat(added),
	};
};

export const actions: Actions = {
	async default(event) {
		const data = await event.request.formData();

		const nameEntry = data.get('name');
		if (nameEntry === null) {
			return fail(400, {
				missing: 'name',
			});
		}

		const tallyEntry = data.get('tally');
		if (tallyEntry === null) {
			return fail(400, {
				missing: 'tally',
			});
		}

		const name = `${nameEntry}`;
		const tally = +tallyEntry;

		const person = {
			name,
			tally,
		};

		added.push(person);

		return {
			success: true,
			person,
		};
	},
};
