import type { PageServerLoad } from './$types';
import type { Present } from './types';

export const load: PageServerLoad = async (event) => {
	const url = 'https://advent.sveltesociety.dev/data/2023/day-three.json';
	const unpacked: Present[] = await event
		.fetch(url, { method: 'GET' })
		.then((response) => response.json());
	const packed: Present[] = [];
	return {
		maxWeight: 100,
		packed,
		unpacked,
	};
};
