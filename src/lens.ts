type AnythingWith<Field extends string | number | symbol, T> = {
	[_ in Field]: T;
};

export class Lens<T extends string | number | symbol, I> {
	private readonly inspect: T;

	constructor(inspect: T) {
		this.inspect = inspect;
	}

	get<U extends AnythingWith<T, I>>(obj: U): I {
		return obj[this.inspect];
	}

	maybeGet<U>(obj: U): I | undefined {
		return (obj as Record<T, I>)[this.inspect];
	}

	set<U>(obj: U, value: I): U {
		return { ...obj, [this.inspect]: value };
	}

	change<U extends AnythingWith<T, I>, I>(obj: U, value: I): U {
		return { ...obj, [this.inspect]: value };
	}

	map<U extends AnythingWith<T, I>, J>(obj: U, f: (old: I) => J): U {
		return { ...obj, [this.inspect]: f(obj[this.inspect]) };
	}
}
