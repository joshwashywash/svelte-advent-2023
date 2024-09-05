export default (min: number, max: number) => {
	return (x: number) => {
		return Math.max(min, Math.min(max, x));
	};
};
