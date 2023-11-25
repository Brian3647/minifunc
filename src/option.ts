/**
 * Option type, either Some(T) or None. Safer alternative to null/undefined.
 *
 * Note: `None()` needs to be a function call for type safety. If you don't care about that,
 * you can initialize None as `const None = Option.None();` and use it as `None` instead of `None()`.
 * @template T Type of the value
 */
export class Option<T> {
	/**
	 * The value of the Option, if it is Some.
	 * @private
	 */
	private value: T | undefined;

	/**
	 * Not meant to be used directly, use Some() or None() instead.
	 * @private
	 */
	private constructor(value?: T | undefined) {
		this.value = value;
	}

	/**
	 * A `Some` value.
	 * @returns {Option<T>}
	 */
	static Some<T>(value: T): Option<T> {
		return new Option(value);
	}

	/**
	 * A `None` value, nothing.
	 * @returns {Option<T>}
	 */
	static None<T>(): Option<T> {
		return new Option<T>();
	}

	/**
	 * Creates a new Option from a nullable value.
	 * @param {T?} value The value to convert to an Option.
	 * @returns {Option<T>} `Some(value)` if the value is not null or undefined, `None` otherwise.
	 */
	static fromNullable<T>(value: T | null | undefined): Option<T> {
		return value === null || value === undefined
			? Option.None<T>()
			: Option.Some(value);
	}

	/**
	 * Checks if the value is Some.
	 * @returns {boolean} true if the Option is Some, false otherwise.
	 */
	isSome(): boolean {
		return this.value !== undefined;
	}

	/**
	 * Checks if the value is None.
	 * @returns {boolean} true if the Option is None, false otherwise.
	 */
	isNone(): boolean {
		return !this.isSome();
	}

	/**
	 * Unwraps the value if the Option is Some, throws an Error otherwise.
	 * @returns {T} the value if the Option is Some.
	 * @throws if the Option is None.
	 */
	unwrap(): T {
		if (this.value === null) {
			throw new Error('Unwrapped None');
		}

		return this.value as T;
	}

	/**
	 * Note: This is an unchecked version of `unwrap()`. Use this only if you
	 * are 100% sure that the Option is Some. If you aren't, this completely defeats
	 * the purpose of using Option in the first place.
	 * @returns {T} the value as T, but not sure if it's Some or not.
	 */
	unwrapUnchecked(): T {
		return this.value as T;
	}

	/**
	 * Do NOT use function calls on `defaultValue`. That will call functions
	 * even if the Option is Some. Use `unwrapOrElse` instead.
	 *
	 * @returns {T} the value if the Option is Some, returns undefined otherwise.
	 * @param {T} defaultValue The value to return if the Option is `None`.
	 * @see unwrapOrElse
	 */
	unwrapOr(defaultValue: T): T {
		return this.value || defaultValue;
	}

	/**
	 * @param {function(): T} fn The function to call if the Option is None.
	 * @returns {T} the value if the Option is Some, returns the result of the function otherwise.
	 */
	unwrapOrElse(fn: () => T): T {
		return this.value || fn();
	}

	/**
	 * Maps an `Option<T>` to `Option<U>` by applying a function to a contained value,
	 * if it's Some.
	 *
	 * Note: This does not mutate the Option, it returns a new one. Use `mapSelf` if
	 * you want to mutate the Option.
	 *
	 * @template U Type of the new value
	 * @param {function(T): U} fn The function to apply to the value.
	 * @returns {Option<U>} `Some(fn(value))` if the Option is Some, `None` otherwise.
	 */
	map<U>(fn: (value: T) => U): Option<U> {
		return this.value ? Option.Some(fn(this.value)) : Option.None<U>();
	}
}

/**
 * @alias Option.Some
 */
export const Some = Option.Some;

/**
 * @alias Option.None
 */
export const None = Option.None;

// Type aliases for convenience

export type PromiseOption<T> = Promise<Option<T>>;
export type POption<T> = PromiseOption<T>;
