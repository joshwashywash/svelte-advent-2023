import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
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

		return {
			success: true,
			person,
		};
	},
};
