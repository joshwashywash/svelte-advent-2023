import type { PageLoad } from './$types';
import type { Present } from './types';

// TODO: svelte 5: change `packed` and `unpacked` arrays to sets once #9739 is fully completed

export const load: PageLoad = async (event) => {
	const url = 'https://advent.sveltesociety.dev/data/2023/day-three.json';
	const unpacked: Present[] = await event
		.fetch(url, { method: 'GET' })
		.then((response) => response.json());
	const packed: Present[] = [];
	return {
		packed,
		unpacked
	};
};
