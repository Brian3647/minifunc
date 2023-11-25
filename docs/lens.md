# Lens

A lens is a functional way to focus on a specific part of a data structure. It is similar to a getter and setter, but it is immutable.

## Initialization

```ts
import { Lens } from 'minifunc';

const lens = Lens('Name of the field you want to target');
```

## Notes

- `AnythingWith` is extremely useful for type safety. It is used to make sure that the field you're targeting is actually in the object you're targeting.
- The actual runtime of `get` and `maybeGet` is exactly the same. The only difference is in types, where `get` will make your build fail if you're passing an object that doesn't have the field you're targeting.
- The same happens with `set` and `change`. `set` doesn't require the field to already exist, while `change` does.

## API

### `Lens<T, U>`

```ts
type AnythingWith<Field extends string | number | symbol, T> = {
	[_ in Field]: T;
};

interface Lens<T extends string | number | symbol, I> {
	get<U extends AnythingWith<T, I>>(obj: U): I;
	maybeGet<U>(obj: U): I | undefined;
	set<U>(obj: U, value: I): U;
	change<U extends AnythingWith<T, I>, I>(obj: U, value: I): U;
	map<U extends AnythingWith<T, I>, J>(obj: U, f: (old: I) => J): U;
}
```
