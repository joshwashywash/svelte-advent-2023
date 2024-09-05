import type { Present } from './types';

export default (presents: Iterable<Present>) => {
	let weight = 0;
	for (const present of presents) {
		weight += present.weight;
	}
	return weight;
};
