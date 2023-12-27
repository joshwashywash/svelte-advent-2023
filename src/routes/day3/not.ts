export default <T>(x: (arg: T) => boolean) =>
	(arg: T) =>
		!x(arg);
