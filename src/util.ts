// Utility functions

export function times<T>(n: number, fn: (i: number) => T): T[] {
	const result = [];

	for (let i = 0; i < n; i++) {
		result.push(fn(i));
	}

	return result;
}

export function range(start: number, end: number, step = 1): number[] {
	const result = [];

	for (let i = start; i < end; i += step) {
		result.push(i);
	}

	return result;
}

export function repeat<T>(n: number, value: T): T[] {
	return times(n, () => value);
}

export function zip<T, U>(a: T[], b: U[]): [T, U][] {
	return a.map((value, index) => [value, b[index]]);
}
