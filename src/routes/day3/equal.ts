import type { Present } from './types';

export default (a: Present) => (b: Present) => a.name === b.name && a.weight === b.weight;
