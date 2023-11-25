# Option

An `Option` is a type that represents either a value or nothing. It is similar to `Maybe` in Haskell or `Option` in Rust.

## Initialization

```ts
import { Option, Some, None } from 'minifunc';

const some = Some(1);
const none = None();
```

> [!NOTE]
> `None` is a function for type safety. If you're using javascript/don't care about type safety, you can use `None` as a value: `const none = None();`. This is not recommended.

## Notes

- Functions should not be called in `Option.unwrapOr(..)`, sice they will be called regardless of whether the value is `Some` or `None`. Use `Option.unwrapOrElse(..)` instead.
- `Option.unwrapUnchecked()` is not recommended, since it might lead to unknown behaviour if the value is None.
- `Option.fromNullable(..)` only takes as nullable `null` or `undefined`. This meants that `Option.fromNullable(0)` will return `Some(0)`, and so will `Option.fromNullable(false)` or other falsy values.

## API

### `Option<T>`

```ts
interface Option<T> {
    isSome(): boolean;
    isNone(): boolean;
    fromNullable<T>(value: T | undefined | null): Option<T>;
    unwrap(): T;
    unwrapOr(value: T): T;
    unwrapOrElse(fn: () => T): T;
    unwrapUnchecked(): T;
    map<U>(fn: (value: T) => U): Option<U>;
}
```

### `Some(..)` and `None(..)`

Both are exported type aliases for `Option.Some` and `Option.None` respectively.
