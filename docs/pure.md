# Pure functions

A pure function is a function that has no side effects and always returns the same output for the same input.

This can be achieved with the `pure` function:

```ts
import { pure } from 'minifunc';

const add = pure((a: number, b: number) => a + b);

add(1, 2); // 3, generated  here
add(1, 2); // 3, taken from cache
```

> [!NOTE]
> The function will not be actually executed until you call it for the first time.
