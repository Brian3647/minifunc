// Forces the same function to return the same value for the same arguments,
// mapping input to output without side effects.
export function pure<A extends Array<T>, T, R>(
	fn: (...args: A) => R,
): (...args: A) => R {
	const cache = new Map<string, R>();

	return (...args: A): R => {
		const key = JSON.stringify(args);
		if (cache.has(key)) {
			return cache.get(key) as R;
		}

		const result = fn(...args);
		cache.set(key, result);
		return result;
	};
}
