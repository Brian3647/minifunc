<div align="center">

# minifunc ⚜️

![License](https://img.shields.io/github/license/Brian3647/minifunc)
![GitHub issues](https://img.shields.io/github/issues/Brian3647/minifunc)
![Build status](https://img.shields.io/github/actions/workflow/status/Brian3647/minifunc/bun.yml)

An extremely simple, small & type-safe functional programming library for TypeScript/JavaScript.

</div>

_heavily inspired by the rust programming language: https://rust-lang.org_

## Installation

You can use your favorite package manager to install minifunc via npmjs.org packages. For example:

```bash
$ bun install minifunc
```

## Features

- `Option<T>`: A type that represents an optional value: every `Option<T>` is either `Some(T)` or `None`.
- `Result<T, E>`: A type that represents either success (`Ok(T)`) or failure (`Err(E)`).

## Usage

The library is fully documented with both JSDoc and typescript declarations. If you're a rust developer, you'll find the library very familiar. Most of the methods are the same as rust's, but using camel case.

Example (declarations):

```typescript
import { Option, Result, Some, None, Ok, Err } from 'minifunc';

const someValue: Option<number> = Some(5);
const noneValue: Option<number> = None;

const someResult: Result<number, string> = Ok(5);
const noneResult: Result<number, string> = Err('error');
```

`.map(..)` and `.mapErr(..)` are also available (the second being only for `Result`).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. If using bun, you can run tests with `bun test`. Most of the work is automated by husky (with the `pre-comit` hook) that you can install with `bun run prepare` or `npm run prepare`. Please make sure to update tests as appropriate.

This project uses prettier for code formatting and biomejs for linting. Both have their respective scripts in `package.json`. For versioning, follow the [Semantic Versioning](https://semver.org/) guidelines.

Although optional, it is recommended to use gitmoji (https://gitmoji.carloscuesta.me/) or cm (https://github.com/Brian3647/cm) for commit messages.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
