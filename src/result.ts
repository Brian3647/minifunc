/**
 * Result type, representing either an Ok value or an error.
 * @template T Type of the Ok value
 * @template E Type of the error
 */
export class Result<T, E> {
	private readonly value: T | E;
	private readonly isError: boolean;

	private constructor(value: T | E, isError: boolean) {
		this.value = value;
		this.isError = isError;
	}

	static Ok<T, E>(value: T): Result<T, E> {
		return new Result<T, E>(value, false);
	}

	static Err<T, E>(value: E): Result<T, E> {
		return new Result<T, E>(value, true);
	}

	isOk(): boolean {
		return !this.isError;
	}

	isErr(): boolean {
		return this.isError;
	}

	unwrap(): T {
		if (this.isOk()) {
			return this.value as T;
		}

		throw new Error(
			`Called unwrap on an Err value: ${JSON.stringify(this.value)}`,
		);
	}

	unwrapErr(): E {
		if (this.isErr()) {
			return this.value as E;
		}

		throw new Error(
			`Called unwrapErr on an Ok value: ${JSON.stringify(this.value)}`,
		);
	}

	/**
	 * Don't use function calls on `defaultValue`. That will call functions even if
	 * the Result is Ok. Use `unwrapOrElse` instead for that.
	 */
	unwrapOr(defaultValue: T): T {
		return this.isOk() ? (this.value as T) : defaultValue;
	}

	unwrapOrElse(defaultValue: (err: E) => T): T {
		return this.isOk() ? (this.value as T) : defaultValue(this.value as E);
	}

	/**
	 * Creates a new Result by applying a function to the Ok value.
	 * Note this will not change the current Result, but return a new one.
	 */
	map<U>(fn: (value: T) => U): Result<U, E> {
		return this.isOk()
			? Result.Ok(fn(this.value as T))
			: (this as unknown as Result<U, E>);
	}

	/**
	 * Maps the error value to a new Result by applying a function.
	 * Note this will not change the current Result, but return a new one.
	 */
	mapErr<F>(fn: (err: E) => F): Result<T, F> {
		return this.isErr()
			? Result.Err(fn(this.value as E))
			: (this as unknown as Result<T, F>);
	}
}

export const Ok = Result.Ok;
export const Err = Result.Err;

// Type aliases

export type PromiseResult<T, E> = Promise<Result<T, E>>;
export type PResult<T, E> = PromiseResult<T, E>;
