export class Result<T, E> {
	/**
	 * The value of the Result, either the Ok value or an error.
	 * @note Do not use this directly.
	 */
	private readonly value: T | E;
	private readonly isError: boolean;

	/**
	 * Not meant to be used directly, use Ok() or Err() instead.
	 */
	private constructor(value: T | E, isError: boolean) {
		this.value = value;
		this.isError = isError;
	}

	/**
	 * An `Ok` value.
	 */
	static Ok<T, E>(value: T) {
		return new Result<T, E>(value, false);
	}

	/**
	 * An `Err` value, an error.
	 */
	static Err<T, E>(value: E) {
		return new Result<T, E>(value, true);
	}

	/**
	 * @returns true if the Result is Ok, false otherwise.
	 */
	isOk() {
		return !this.isError;
	}

	/**
	 * @returns true if the Result is Err, false otherwise.
	 */
	isErr() {
		return this.isError;
	}

	/**
	 * @returns the value if the Result is Ok, throws an Error otherwise.
	 */
	unwrap() {
		if (this.isOk()) {
			return this.value as T;
		}

		throw new Error(
			`Called unwrap on an Err value: ${JSON.stringify(this.value)}`,
		);
	}

	/**
	 * @returns the error if the Result is Err, throws an Error otherwise.
	 */
	unwrapErr() {
		if (this.isErr()) {
			return this.value as E;
		}

		throw new Error(
			`Called unwrapErr on an Ok value: ${JSON.stringify(this.value)}`,
		);
	}

	/**
	 * @returns the value if the Result is Ok, or a default value.
	 */ /**
	 * Maps an Option<T> to Option<U> by applying a function to a contained value, if it's Some.
	 */

	unwrapOr(defaultValue: T) {
		return this.isOk() ? (this.value as T) : defaultValue;
	}

	/**
	 * @returns the value if the Result is Ok, or a default value called from a function.
	 */
	unwrapOrElse(defaultValue: (err: E) => T) {
		return this.isOk() ? (this.value as T) : defaultValue(this.value as E);
	}

	/**
	 * Maps a `Result<T, _>` to `Result<U, _>` by applying a function to a contained value, if it's Ok.
	 */
	map<U>(fn: (value: T) => U): Result<U, E> {
		return this.isOk()
			? Result.Ok(fn(this.value as T))
			: // This is safe, because we know that the value is an error.
			  (this as unknown as Result<U, E>);
	}

	/**
	 * Maps a `Result<_, E>` to `Result<_, F>` by applying a function to a contained error, if it's Err.
	 */
	mapErr<F>(fn: (err: E) => F): Result<T, F> {
		return this.isErr()
			? Result.Err(fn(this.value as E))
			: // This is safe, because we know that the value is Ok.
			  (this as unknown as Result<T, F>);
	}
}

export const Ok = Result.Ok;
export const Err = Result.Err;

// Type aliases for convenience.

export type PromiseResult<T, E> = Promise<Result<T, E>>;
export type PResult<T, E> = PromiseResult<T, E>;
