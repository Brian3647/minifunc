/**
 * Option type, either Some(T) or None. Useful alternative to null/undefined.
 * @param T Type of the value
 * @example
 * const some = Some(1);
 * const none = None();
 * some.isSome(); // true
 * some.isNone(); // false
 *
 * const other = Option.fromNullable(null); // None value
 * other.isSome(); // false
 * other.unwrap(); // throws Error
 * @note None() needs to be a function call for type safety. If you don't care about that,
 * you can initialize None as `const None = Option.None();` and use it as `None` instead of `None()`.
 */
export class Option<T> {
	/**
	 * The value of the Option, if it is Some.
	 * @note Do not use this directly.
	 */
	private value: T | undefined;

	/**
	 * Not meant to be used directly, use Some() or None() instead.
	 */
	private constructor(value?: T | undefined) {
		this.value = value;
	}

	/**
	 * A `Some` value.
	 */
	static Some<T>(value: T) {
		return new Option(value);
	}

	/**
	 * A `None` value, nothing.
	 */
	static None<T>() {
		return new Option<T>();
	}

	/**
	 * Creates a new Option from a nullable value.
	 * @example
	 * Option.fromNullable(1); // Some(1)
	 * Option.fromNullable(null); // None
	 * Option.fromNullable(undefined); // None
	 */
	static fromNullable<T>(value: T | null | undefined) {
		return value === null || value === undefined
			? Option.None<T>()
			: Option.Some(value);
	}

	/**
	 * @returns true if the Option is Some, false otherwise.
	 */
	isSome() {
		return this.value !== undefined;
	}

	/**
	 * @returns true if the Option is None, false otherwise.
	 */
	isNone() {
		return !this.isSome();
	}

	/**
	 * @returns the value if the Option is Some, throws an Error otherwise.
	 */
	unwrap() {
		if (this.value === null) {
			throw new Error('Unwrapped None');
		}

		return this.value;
	}

	/**
	 * @returns the value as T, but not sure if it's Some or not.
	 * @note This is an unchecked version of `unwrap()`. Use this only if you
	 * are 100% sure that the Option is Some. If you aren't, this completely defeats
	 * the purpose of using Option in the first place.
	 */
	unwrapUnchecked() {
		return this.value as T;
	}

	/**
	 * @returns the value if the Option is Some, returns undefined otherwise.
	 * @note Do NOT use function calls on `defaultValue`. That will call functions
	 * even if the Option is Some. Use [`unwrapOrElse`] instead.
	 */
	unwrapOr(defaultValue: T) {
		return this.value || defaultValue;
	}

	/**
	 * @returns the value if the Option is Some, returns the result of the function otherwise.
	 */
	unwrapOrElse(fn: () => T) {
		return this.value || fn();
	}

	/**
	 * Maps an `Option<T>` to `Option<U>` by applying a function to a contained value,
	 * if it's Some.
	 * @note This does not mutate the Option, it returns a new one. Use `mapSelf` if
	 * you want to mutate the Option.
	 */
	map<U>(fn: (value: T) => U) {
		return this.value ? Option.Some(fn(this.value)) : Option.None<U>();
	}
}

export const Some = Option.Some;
export const None = Option.None;

// Type aliases for convenience

export type PromiseOption<T> = Promise<Option<T>>;
export type POption<T> = PromiseOption<T>;
