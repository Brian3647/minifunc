# Utility functions

The library also includes some utility functions that can be useful in some cases:

## `times`

Generates an array of `n` elements, where each element is the result of calling the function `fn` with the index of the element.

```ts
import { times } from 'minifunc';

const arr = times(5, i => i * 2);
// [0, 2, 4, 6, 8]
```

## `range`

Generates an array of numbers from `start` to `end` (inclusive) with a step of `step`, which defaults to `1`.

```ts
import { range } from 'minifunc';

const arr = range(1, 5);
// [1, 2, 3, 4, 5]

const arr2 = range(1, 5, 2);
// [1, 3, 5]
```

## `zip`

Zips two arrays together, creating an array of tuples.

```ts
import { zip } from 'minifunc';

const arr = zip([1, 2, 3], ['a', 'b', 'c']);
// [[1, 'a'], [2, 'b'], [3, 'c']]
```

## `repeat`

Repeats a value `n` times.

```ts
import { repeat } from 'minifunc';

const arr = repeat(5, 'a');
// ['a', 'a', 'a', 'a', 'a']
```
