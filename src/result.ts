/**
 * Result type, representing either an Ok value or an error.
 * @template T Type of the Ok value
 * @template E Type of the error
 */
export class Result<T, E> {
	/**
	 * The value of the Result, either the Ok value or an error.
	 * @private
	 */
	private readonly value: T | E;

	/**
	 * Indicates whether the Result is an error.
	 * @private
	 */
	private readonly isError: boolean;

	/**
	 * Not meant to be used directly, use Ok() or Err() instead.
	 * @private
	 */
	private constructor(value: T | E, isError: boolean) {
		this.value = value;
		this.isError = isError;
	}

	/**
	 * Creates an `Ok` Result.
	 * @param {T} value The Ok value.
	 * @returns {Result<T, E>} An `Ok` Result.
	 */
	static Ok<T, E>(value: T): Result<T, E> {
		return new Result<T, E>(value, false);
	}

	/**
	 * Creates an `Err` Result.
	 * @param {E} value The error value.
	 * @returns {Result<T, E>} An `Err` Result.
	 */
	static Err<T, E>(value: E): Result<T, E> {
		return new Result<T, E>(value, true);
	}

	/**
	 * Checks if the Result is Ok.
	 * @returns {boolean} true if the Result is Ok, false otherwise.
	 */
	isOk(): boolean {
		return !this.isError;
	}

	/**
	 * Checks if the Result is Err.
	 * @returns {boolean} true if the Result is Err, false otherwise.
	 */
	isErr(): boolean {
		return this.isError;
	}

	/**
	 * Unwraps the Ok value.
	 * @returns {T} The Ok value.
	 * @throws {Error} If called on an Err value.
	 */
	unwrap(): T {
		if (this.isOk()) {
			return this.value as T;
		}

		throw new Error(
			`Called unwrap on an Err value: ${JSON.stringify(this.value)}`,
		);
	}

	/**
	 * Unwraps the error value.
	 * @returns {E} The error value.
	 * @throws {Error} If called on an Ok value.
	 */
	unwrapErr(): E {
		if (this.isErr()) {
			return this.value as E;
		}

		throw new Error(
			`Called unwrapErr on an Ok value: ${JSON.stringify(this.value)}`,
		);
	}

	/**
	 * Unwraps the Ok value or returns a default value. Don't use this if
	 * the default value is expensive to compute, use unwrapOrElse instead for that.
	 * @param {T} defaultValue The default value.
	 * @returns {T} The Ok value or the default value.
	 * @see unwrapOrElse
	 */
	unwrapOr(defaultValue: T): T {
		return this.isOk() ? (this.value as T) : defaultValue;
	}

	/**
	 * Unwraps the Ok value or returns a default value from a function.
	 * @param {function(E): T} defaultValue The function to provide the default value.
	 * @returns {T} The Ok value or the default value.
	 */
	unwrapOrElse(defaultValue: (err: E) => T): T {
		return this.isOk() ? (this.value as T) : defaultValue(this.value as E);
	}

	/**
	 * Maps the Ok value to a new Result by applying a function.
	 * @template U Type of the new Ok value
	 * @param {function(T): U} fn The function to apply to the Ok value.
	 * @returns {Result<U, E>} A new Result with the mapped Ok value.
	 */
	map<U>(fn: (value: T) => U): Result<U, E> {
		return this.isOk()
			? Result.Ok(fn(this.value as T))
			: (this as unknown as Result<U, E>);
	}

	/**
	 * Maps the error value to a new Result by applying a function.
	 * @template F Type of the new error
	 * @param {function(E): U} fn The function to apply to the error value.
	 * @returns {Result<T, F>} A new Result with the mapped error value.
	 */
	mapErr<F>(fn: (err: E) => F): Result<T, F> {
		return this.isErr()
			? Result.Err(fn(this.value as E))
			: (this as unknown as Result<T, F>);
	}
}

/**
 * @alias Result.Ok
 */
export const Ok = Result.Ok;

/**
 * @alias Result.Err
 */
export const Err = Result.Err;

// Type aliases

export type PromiseResult<T, E> = Promise<Result<T, E>>;
export type PResult<T, E> = PromiseResult<T, E>;
