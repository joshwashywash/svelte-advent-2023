import type { HeartRate } from './types';
import type { PageLoad } from './$types';
import { url } from './constants';

export const load: PageLoad = async (event) => {
	const heartRate: HeartRate = await event.fetch(url).then((response) => {
		return response.json();
	});
	return heartRate;
};
