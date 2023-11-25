export class Option<T> {
	private value: T | undefined;

	private constructor(value?: T | undefined) {
		this.value = value;
	}

	static Some<T>(value: T): Option<T> {
		return new Option(value);
	}

	static None<T>(): Option<T> {
		return new Option<T>();
	}

	static fromNullable<T>(value: T | null | undefined): Option<T> {
		return value === null || value === undefined
			? Option.None<T>()
			: Option.Some(value);
	}

	isSome(): boolean {
		return this.value !== undefined;
	}

	isNone(): boolean {
		return !this.isSome();
	}

	unwrap(): T {
		if (this.value === null) {
			throw new Error('Unwrapped None');
		}

		return this.value as T;
	}

	unwrapUnchecked(): T {
		return this.value as T;
	}

	/**
	 * Do NOT use function calls on `defaultValue`. That will call functions
	 * even if the Option is Some. Use `unwrapOrElse` instead.
	 */
	unwrapOr(defaultValue: T): T {
		return this.value || defaultValue;
	}

	unwrapOrElse(fn: () => T): T {
		return this.value || fn();
	}

	map<U>(fn: (value: T) => U): Option<U> {
		return this.value ? Option.Some(fn(this.value)) : Option.None<U>();
	}
}

export const Some = Option.Some;
export const None = Option.None;

// Type aliases for convenience

export type PromiseOption<T> = Promise<Option<T>>;
export type POption<T> = PromiseOption<T>;
