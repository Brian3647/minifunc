import { expect, test } from 'bun:test';
import { Some, None, Option, Result, Ok, Err, PResult } from './lib';

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

async function __typeIntellisenseTest(x: number): PResult<number, string> {
	if (x === 1) {
		return Ok(x);
	} else {
		// return Err(123);
		return Err('error');
	}
}
