import { expect, test } from 'bun:test';

import {
	Some,
	None,
	Option,
	Lens,
	Ok,
	Err,
	PResult,
	pure,
	times,
	range,
	repeat,
	zip,
} from './lib';

const assertEq = (a: unknown, b: unknown) => expect(a).toEqual(b);
const assert = (a: unknown) => assertEq(a, true);

test('Option', () => {
	let some = Some(1);
	const none = None<number>();

	assertEq(none.unwrapOr(2), 2);

	assert(some.isSome());
	assert(none.isNone());

	assertEq(some.unwrap(), 1);

	some = some.map((x) => x * 2);

	assertEq(some.map((x) => x + 1).unwrap(), 3);

	try {
		none.unwrap();
	} catch (e) {
		assertEq((e as Error).message, 'Unwrapped None');
	}

	assertEq(Option.fromNullable(none.unwrapUnchecked()), none);
});

test('Result', () => {
	let ok = Ok(1);
	let err = Err<number, string>('error');

	assertEq(err.unwrapOr(2), 2);

	assert(ok.isOk());
	assert(err.isErr());

	assertEq(ok.unwrap(), 1);

	ok = ok.map((x) => x * 2);

	assertEq(ok.map((x) => x + 1).unwrap(), 3);

	try {
		err.unwrap();
	} catch (e) {
		assertEq((e as Error).message, 'Called unwrap on an Err value: "error"');
	}

	err = err.mapErr((x) => x + '!');

	assertEq(err.unwrapErr(), 'error!');
});

test('Lens', () => {
	const obj = { a: 1, b: 2, c: 3 };
	const lensA = new Lens<'a', number>('a');
	const lensD = new Lens('d');

	// Test get method
	expect(lensA.get(obj)).toBe(1);

	// Test set method
	let newObj = lensA.set(obj, 2);
	expect(newObj).toEqual({ a: 2, b: 2, c: 3 });

	// Test maybeGet method when property exists
	expect(lensA.maybeGet(obj)).toBe(1);

	// Test maybeGet method when property does not exist
	expect(lensD.maybeGet(obj)).toBeUndefined();

	// Test change method
	newObj = lensA.change(obj, 3);
	expect(newObj).toEqual({ a: 3, b: 2, c: 3 });

	// Test map method
	newObj = lensA.map(obj, (a) => a * 2);
	expect(newObj).toEqual({ a: 2, b: 2, c: 3 });

	let obj2 = {
		x: 0,
	};

	const lensX = new Lens('x');
	obj2 = lensX.change(obj2, 2);

	expect(lensX.get(obj2)).toBe(2);
});

test('Pure', () => {
	const purefn = pure((_: number) => Math.random());

	const first = purefn(0);
	const second = purefn(1);

	expect(first).not.toBe(second);
	expect(purefn(0)).toBe(first);
	expect(purefn(1)).toBe(second);
});

test('Utility functions', () => {
	const timesResult = times(5, (i) => i * 2);
	expect(timesResult).toEqual([0, 2, 4, 6, 8]);

	const rangeResult = range(1, 5);
	expect(rangeResult).toEqual([1, 2, 3, 4]);

	const rangeWithStepResult = range(1, 10, 2);
	expect(rangeWithStepResult).toEqual([1, 3, 5, 7, 9]);

	const repeatResult = repeat(3, 'a');
	expect(repeatResult).toEqual(['a', 'a', 'a']);

	const zipResult = zip([1, 2, 3], ['a', 'b', 'c']);
	expect(zipResult).toEqual([
		[1, 'a'],
		[2, 'b'],
		[3, 'c'],
	]);
});

async function __typeIntellisenseTest(x: number): PResult<number, string> {
	if (x === 1) {
		return Ok(x);
	} else {
		// return Err(123);
		return Err('error');
	}
}
