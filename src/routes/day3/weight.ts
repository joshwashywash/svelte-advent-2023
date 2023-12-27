import type { Present } from './types';

export default (presents: Present[]) => presents.reduce((sum, present) => sum + present.weight, 0);
