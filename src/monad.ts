export class Monad<T> {
	private readonly value: T;

	private constructor(value: T) {
		this.value = value;
	}

	static of<T>(value: T): Monad<T> {
		return new Monad(value);
	}

	map<U>(fn: (value: T) => U): Monad<U> {
		return Monad.of(fn(this.value));
	}

	flatMap<U>(fn: (value: T) => Monad<U>): Monad<U> {
		return fn(this.value);
	}

	get(): T {
		return this.value;
	}
}
