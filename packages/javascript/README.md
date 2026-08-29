![logo](https://raw.githubusercontent.com/jooy2/qsu/refs/heads/main/.github/resources/qsu-logo.webp)

# qsu - Quick & Simple Utility

[![npm latest package](https://img.shields.io/npm/v/qsu/latest.svg)](https://www.npmjs.com/package/qsu) [![npm downloads](https://img.shields.io/npm/dm/qsu.svg)](https://www.npmjs.com/package/qsu) ![minified size](https://img.shields.io/bundlephobia/min/qsu) ![node version](https://img.shields.io/node/v/qsu) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jooy2/qsu/blob/main/LICENSE) [![test](https://github.com/jooy2/qsu/actions/workflows/run-test-javascript.yml/badge.svg)](https://github.com/jooy2/qsu/actions/workflows/run-test-javascript.yml)

**qsu** is a library that collects frequently used utility functions — slugs, text case, date math, number and file size formatting, deep clone and merge, validation, hashing, file and OS helpers. Stop rewriting the same small helpers in every project and stop pulling in a large toolkit for three of them.

```javascript
import { getSlug, fileSizeFormat, objMerge } from 'qsu';

getSlug('Hello World!'); // 'hello-world'
fileSizeFormat(1000000); // '976.56 KB'
objMerge({ a: { b: 1 } }, { a: { c: 2 } }); // { a: { b: 1, c: 2 } }
```

## Why qsu

- **No runtime dependencies.** Nothing is installed alongside it.
- **Tree-shakeable.** The package is marked side-effect free, so your bundler keeps only the functions you actually import.
- **ESM only.** Written for modern toolchains, from bundlers to serverless runtimes.
- **Typed.** TypeScript declarations ship with the package, and the shared option types are importable from `qsu/types`.
- **Browser-safe by default.** Functions that need a Node.js runtime live behind the `qsu/node` subpath, so the main entry point never reaches for `node:fs` or `node:crypto`.
- **Predictable.** Arguments are validated and edge cases — `null`, empty values, surrogate pairs, nested arrays — return a sensible result instead of throwing.
- **Tested.** The suite runs on Node.js 22, 24 and 26 across Linux, macOS and Windows in CI.

## Installation

**qsu** requires `Node.js 18` or later.

```bash
npm install qsu
```

```bash
pnpm add qsu
```

```bash
yarn add qsu
```

## How to use

Import only the functions you need:

```javascript
import { today, strCount } from 'qsu';

console.log(today()); // '20xx-xx-xx'
console.log(strCount('123412341234', '1')); // 3
```

You can also import the package under a single name. It makes qsu's functions easy to spot in a file, but it is not the recommended default: a bundler can still drop untouched functions while every access is a plain property (`_.today()`), but as soon as a name is looked up dynamically (`_[name]()`) or `_` is handed to something else, the whole library has to be kept.

```javascript
import * as _ from 'qsu';

console.log(_.today()); // '20xx-xx-xx'
console.log(_.strCount('123412341234', '1')); // 3
```

### Node.js only functions

Functions for the filesystem, hashing, networking and the operating system need a Node.js runtime, so they are published under the `qsu/node` subpath and are not part of the browser-safe entry point:

```javascript
import { createFile, md5Hash } from 'qsu/node';

md5Hash('test'); // '098f6bcd4621d373cade4e832627b4f6'
await createFile('/home/user/Hello.txt');
```

Every reference page states whether the function has to be imported from `qsu/node`.

### Importing a single category

If you are not running a bundler at all — a script, a serverless function, a test — you can import a single category so that only that category's modules are loaded:

```javascript
import { arrUnique } from 'qsu/array';
import { getSlug } from 'qsu/web';
import { md5Hash } from 'qsu/node/crypto';
```

### Types

Option types are shared and can be imported directly:

```typescript
import type { SlugOptions, DurationOptions } from 'qsu/types';

const options: SlugOptions = { separator: '_', includeNumbers: false };
```

## Examples

```javascript
import {
	arrUnique,
	duration,
	numberFormat,
	objPick,
	pad,
	strToCamelCase,
	truncate,
	isEmail
} from 'qsu';

// Arrays
arrUnique([1, 1, 2, 3, 3]); // [1, 2, 3]

// Formatting
numberFormat(1234567); // '1,234,567'
duration(1234567890); // '14 Days 6 Hours 56 Minutes 7 Seconds'

// Objects
objPick({ a: 1, b: 2, c: 3 }, ['a', 'c']); // { a: 1, c: 3 }

// Strings
strToCamelCase('foo bar'); // 'fooBar'
truncate('Hello world', 5, '...'); // 'Hello...'
pad('7', 3, { char: '0', position: 'start' }); // '007'

// Validation
isEmail('abc@example.com'); // true
```

Optional arguments are passed as an options object, and every option has a documented default:

```javascript
getSlug('Hello World!', { separator: '_' }); // 'hello_world'
fileSizeFormat(100000000, 3, true); // '96 MB'
```

## API overview

Functions are grouped into categories, each with an import subpath of its own.

| Category | Import path | Examples |
| --- | --- | --- |
| `array` | `qsu/array` | `arrUnique`, `arrGroupByMaxCount`, `sortNumeric` |
| `date` | `qsu/date` | `today`, `dayDiff`, `createDateListFromRange` |
| `format` | `qsu/format` | `numberFormat`, `fileSizeFormat`, `duration` |
| `math` | `qsu/math` | `sum`, `clamp`, `round`, `numPick` |
| `misc` | `qsu/misc` | `debounce`, `throttle`, `retry`, `sleep` |
| `object` | `qsu/object` | `objClone`, `objMerge`, `objPick`, `objGet` |
| `string` | `qsu/string` | `trim`, `truncate`, `strToCamelCase`, `pad` |
| `verify` | `qsu/verify` | `isEmail`, `isUrl`, `isEmpty`, `isEqual` |
| `web` | `qsu/web` | `getSlug`, `escapeHtml`, `isMobile`, `isBotAgent` |
| `crypto` | `qsu/node/crypto` | `md5Hash`, `sha256Hash`, `encodeBase64`, `objectId` |
| `file` | `qsu/node/file` | `getFileSize`, `moveFile`, `joinFilePath` |
| `misc` | `qsu/node/misc` | `logBox` |
| `net` | `qsu/node/net` | `fetchData` |
| `os` | `qsu/node/os` | `getCpu`, `getRamSize`, `runCommand` |

The categories in the top half are exported from `qsu` and are safe to bundle for the browser. The `crypto`, `file`, `net` and `os` categories, and `logBox`, need a Node.js runtime and are exported from `qsu/node`.

## Documentation

Installing and using the package and defining all the utility methods can be found on the documentation page below.

- [Installation](https://qsu.cdget.com/installation/javascript)
- [Reference](https://qsu.cdget.com/reference) — every function, with parameters, defaults and examples
- [Changelog](https://qsu.cdget.com/changelog/javascript)

## Development

The package lives in the [qsu monorepo](https://github.com/jooy2/qsu) under `packages/javascript`. Source is TypeScript in `lib/`, built to `dist/`.

```bash
npm install     # install dev dependencies
npm test        # build, then run the test suite
npm run build   # compile with tsc and minify with terser
npm run lint    # ESLint
npm run format  # Prettier
```

## Contributing

Anyone can contribute to the project by reporting new issues or submitting a pull request. For more information, please see [CONTRIBUTING.md](https://github.com/jooy2/qsu/blob/main/CONTRIBUTING.md).

## License

Please see the [LICENSE](LICENSE) file for more information about project owners, usage rights, and more.
