import type { HeartRate } from './types';
import type { PageServerLoad } from './$types';
import { url } from './constants';

export const load: PageServerLoad = async (event) => {
	const heartRate: HeartRate = await event.fetch(url).then((response) => {
		return response.json();
	});
	return heartRate;
};
