# Result

A `Result` is a type that represents either success or failure. It is similar to rust's `Result` type.

## Initialization

```ts
import { Result, Ok, Err } from 'minifunc';

const ok = Ok(1);
const err = Err('error');
```

## Notes

- Functions should not be called in `Result.unwrapOr(..)`, sice they will be called regardless of whether the value is `Ok` or `Err`. Use `Result.unwrapOrElse(..)` instead.
- `Result.unwrapUnchecked()` is not recommended, since it will return the value as `T` even if it's an error.

## API

### `Result<T, E>`

```ts
interface Result<T, E> {
	isOk(): boolean;
	isErr(): boolean;
	unwrap(): T;
	unwrapOr(value: T): T;
	unwrapOrElse(fn: (error: E) => T): T;
	unwrapUnchecked(): T;
	map<U>(fn: (value: T) => U): Result<U, E>;
	mapErr<U>(fn: (error: E) => U): Result<T, U>;
}
```

### `Ok(..)` and `Err(..)`

Both are exported type aliases for `Result.Ok` and `Result.Err` respectively.
