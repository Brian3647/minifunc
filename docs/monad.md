# Monad

A monad is a type that represents a value that can be chained with different functions.

## Initialization

```ts
import { Monad } from 'minifunc';

const monad = Monad.of(1);
```

## Notes

- `map` converts the result from the function to another `Monad`, while `flatMap` expects you to return a `Monad` from the function.

## API

### `Monad<T>`

```ts
interface Monad<T> {
	of<U>(value: U): Monad<U>;
	map<U>(fn: (value: T) => U): Monad<U>;
	flatMap<U>(fn: (value: T) => Monad<U>): Monad<U>;
	get(): T; // Finishes the chain
}
```
