export default (min: number, max: number) => (x: number) => Math.max(min, Math.min(max, x));
