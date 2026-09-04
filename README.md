![logo](https://raw.githubusercontent.com/jooy2/qsu/refs/heads/main/.github/resources/qsu-logo.webp)

# qsu - Quick & Simple Utility

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jooy2/qsu/blob/main/LICENSE) [![JavaScript](https://github.com/jooy2/qsu/actions/workflows/run-test-javascript.yml/badge.svg)](https://github.com/jooy2/qsu/actions/workflows/run-test-javascript.yml) [![Dart](https://github.com/jooy2/qsu/actions/workflows/run-test-dart.yml/badge.svg)](https://github.com/jooy2/qsu/actions/workflows/run-test-dart.yml) [![Python](https://github.com/jooy2/qsu/actions/workflows/run-test-python.yml/badge.svg)](https://github.com/jooy2/qsu/actions/workflows/run-test-python.yml) ![Commit Count](https://img.shields.io/github/commit-activity/y/jooy2/qsu) [![Followers](https://img.shields.io/github/followers/jooy2?style=social)](https://github.com/jooy2) ![Stars](https://img.shields.io/github/stars/jooy2/qsu?style=social)

**qsu** is a library that collects frequently used utility functions — slugs, text case, date math, number and file size formatting, deep clone and merge, validation, hashing, file and OS helpers. Streamline repetitive code with functions that are already written and tested for you.

What makes qsu different is **cross-language parity**. A function has the same name, the same arguments and the same behavior in every language it supports, so moving between a Node.js backend, a Flutter app and a Python script does not mean relearning your utility belt.

```javascript
// JavaScript / Node.js
import { getSlug, fileSizeFormat } from "qsu";

getSlug("Hello World!"); // 'hello-world'
fileSizeFormat(1000000); // '976.56 KB'
```

```dart
// Dart / Flutter
import 'package:qsu/qsu.dart';

getSlug('Hello World!'); // 'hello-world'
fileSizeFormat(1000000); // '976.56 KB'
```

```python
# Python
from qsu import getSlug, fileSizeFormat

getSlug('Hello World!')  # 'hello-world'
fileSizeFormat(1000000)  # '976.56 KB'
```

## Highlights

- **One API, three languages.** The same `camelCase` function name, the same category and the same test cases in JavaScript, Dart and Python.
- **Lightweight.** The JavaScript package has no runtime dependencies and is fully tree-shakeable; the Dart and Python packages pull in only what hashing and path handling actually require.
- **Typed.** TypeScript declarations ship with the npm package, Dart signatures are fully annotated, and the Python package is `py.typed` for mypy and other checkers.
- **Safe.** Arguments are validated and edge cases — `null`, empty values, surrogate pairs, nested arrays — return a sensible result instead of throwing.
- **Tested.** Every package runs its suite on Linux, macOS and Windows across multiple runtime versions in CI.
- **Documented.** Every function has its own reference page, in English and Korean, at [qsu.cdget.com](https://qsu.cdget.com).

## Getting Started

Start `qsu` in your preferred programming language:

| Language             | Links                                                                                                                            | Stat                                                                                                                                                                                                                                                               |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| JavaScript / Node.js | **[Documentation](https://qsu.cdget.com/installation)** <br/> [Changelog](https://qsu.cdget.com/changelog/) | [![npm latest package](https://img.shields.io/npm/v/qsu/latest.svg)](https://www.npmjs.com/package/qsu) [![npm downloads](https://img.shields.io/npm/dm/qsu.svg)](https://www.npmjs.com/package/qsu) ![minified size](https://img.shields.io/bundlephobia/min/qsu) |
| Dart / Flutter       | **[Documentation](https://qsu.cdget.com/installation)** <br/> [Changelog](https://qsu.cdget.com/changelog/)             | ![Pub Version](https://img.shields.io/pub/v/qsu) ![Pub Monthly Downloads](https://img.shields.io/pub/dm/qsu) ![Pub Likes](https://img.shields.io/pub/likes/qsu) ![Pub Points](https://img.shields.io/pub/points/qsu)                                               |
| Python               | **[Documentation](https://qsu.cdget.com/installation)** <br/> [Changelog](https://qsu.cdget.com/changelog/)         | [![PyPI version](https://img.shields.io/pypi/v/qsu)](https://pypi.org/project/qsu/) [![PyPI downloads](https://img.shields.io/pypi/dm/qsu)](https://pypi.org/project/qsu/) ![PyPI python versions](https://img.shields.io/pypi/pyversions/qsu)                     |

Install it with the package manager you already use:

```bash
npm install qsu
```

```bash
dart pub add qsu
```

```bash
pip install qsu
```

## What's inside

Functions are grouped into categories. JavaScript and Python ship 150+ functions, Dart 130+ — a handful are language-specific, and every reference page states which languages implement it.

| Category | JavaScript    | Dart | Python | Examples                                            |
| -------- | ------------- | ---- | ------ | --------------------------------------------------- |
| `array`  | ✅            | ✅   | ✅     | `arrUnique`, `arrGroupByMaxCount`, `sortNumeric`    |
| `crypto` | ✅ `qsu/node` | ✅   | ✅     | `md5Hash`, `sha256Hash`, `encodeBase64`, `objectId` |
| `date`   | ✅            | ✅   | ✅     | `today`, `dayDiff`, `createDateListFromRange`       |
| `file`   | ✅ `qsu/node` | ✅   | ✅     | `getFileSize`, `moveFile`, `joinFilePath`           |
| `format` | ✅            | ✅   | ✅     | `numberFormat`, `fileSizeFormat`, `duration`        |
| `math`   | ✅            | ✅   | ✅     | `sum`, `clamp`, `round`, `numPick`                  |
| `misc`   | ✅            | ✅   | ✅     | `debounce`, `throttle`, `retry`, `sleep`            |
| `net`    | ✅ `qsu/node` | —    | ✅     | `fetchData`                                         |
| `object` | ✅            | ✅   | ✅     | `objClone`, `objMerge`, `objPick`, `objGet`         |
| `os`     | ✅ `qsu/node` | —    | ✅     | `getCpu`, `getRamSize`, `runCommand`                |
| `string` | ✅            | ✅   | ✅     | `trim`, `truncate`, `strToCamelCase`, `pad`         |
| `verify` | ✅            | ✅   | ✅     | `isEmail`, `isUrl`, `isEmpty`, `isEqual`            |
| `web`    | ✅            | ✅   | ✅     | `getSlug`, `escapeHtml`, `isMobile`, `isBotAgent`   |

In JavaScript, categories marked `qsu/node` require a Node.js runtime and are imported from the `qsu/node` subpath so the browser-safe entry point stays free of Node built-ins. Dart and Python have no such split; in Dart, the `file` helpers use `dart:io` and are therefore unavailable on Flutter Web.

## Documentation

The full documentation lives at **[qsu.cdget.com](https://qsu.cdget.com)**, in English and Korean.

- [Introduction](https://qsu.cdget.com/introduction) — what qsu is and what it is good for
- [Installation](https://qsu.cdget.com/installation) — installing the package, in the language you pick
- [Reference](https://qsu.cdget.com/reference) — every function, with parameters, defaults and examples
- [Changelog](https://qsu.cdget.com/changelog/) — what changed in each package, by version
- [llms.txt](https://qsu.cdget.com/llms.txt) — a machine-readable index of every function, for use with LLM tooling

## Cross-language parity

The rules that keep the packages interchangeable:

- **Names are `camelCase` in every language**, including Dart and Python. This is deliberate and non-idiomatic, so that `getSlug` is `getSlug` wherever you are.
- **Behavior and test cases are ported, not just implementations.** When a function changes, the tests change in all packages.
- **Optional arguments follow each language's convention.** JavaScript takes an options object, Dart takes named parameters, and Python accepts either a `dict` or keyword arguments.
- **Not every function exists everywhere.** Dart has no `net` or `os` category, and a few individual functions are JavaScript- and Python-only. The language badge at the top of each reference page is the source of truth.

The same call, with the same result, in each language:

```javascript
fileSizeFormat(100000000, 3, true); // '96 MB'
```

```dart
fileSizeFormat(100000000, decimals: 3, ceil: true); // '96 MB'
```

```python
fileSizeFormat(100000000, 3, True)  # '96 MB'
```

## Repository layout

```
packages/
  javascript/   # npm package `qsu` (TypeScript source in lib/, built to dist/)
  dart/         # pub package `qsu` (lib/src/<category>.dart)
  python/       # PyPI package `qsu` (qsu/<category>/<functionName>.py)
docs/           # VitePress documentation site (en + ko), published to qsu.cdget.com
```

Each package keeps its own `README.md`, `CHANGELOG.md` and `LICENSE`.

## Development

Clone the repository and work inside the package you want to change:

| Package                           | Install                   | Test        | Analyze / Format                  |
| --------------------------------- | ------------------------- | ----------- | --------------------------------- |
| [JavaScript](packages/javascript) | `npm install`             | `npm test`  | `npm run lint` / `npm run format` |
| [Dart](packages/dart)             | `dart pub get`            | `dart test` | `dart analyze` / `dart format .`  |
| [Python](packages/python)         | `pip install -e ".[dev]"` | `pytest`    | `mypy`                            |

The documentation site uses pnpm and requires Node.js 18 or later:

```bash
cd docs && pnpm install && pnpm run dev
```

A change to a shared function usually touches all three packages plus both documentation locales. See [CLAUDE.md](CLAUDE.md) for the full checklist.

## Contributing

Anyone can contribute to the project by reporting new issues or submitting a pull request. For more information, please see [CONTRIBUTING.md](CONTRIBUTING.md). Participation is subject to the [Code of Conduct](CODE_OF_CONDUCT.md).

To report a security issue, please follow the process described in [SECURITY.md](SECURITY.md).

## License

Please see the [LICENSE](LICENSE) file for more information about project owners, usage rights, and more.
