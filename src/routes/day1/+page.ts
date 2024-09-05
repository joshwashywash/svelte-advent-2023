import type { PageLoad } from './$types';
import type { Person } from './types';

export const load: PageLoad = async (event) => {
	const url = 'https://advent.sveltesociety.dev/data/2023/day-one.json';
	const people: Person[] = await event
		.fetch(url, { method: 'GET' })
		.then((response) => response.json());
	return {
		people,
	};
};
