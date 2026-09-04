![logo](https://raw.githubusercontent.com/jooy2/qsu/refs/heads/main/.github/resources/qsu-logo.webp)

# qsu - Quick & Simple Utility

[![Pub Version](https://img.shields.io/pub/v/qsu)](https://pub.dev/packages/qsu) [![Pub Monthly Downloads](https://img.shields.io/pub/dm/qsu)](https://pub.dev/packages/qsu) [![Pub Likes](https://img.shields.io/pub/likes/qsu)](https://pub.dev/packages/qsu) [![Pub Points](https://img.shields.io/pub/points/qsu)](https://pub.dev/packages/qsu) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jooy2/qsu/blob/main/LICENSE) [![test](https://github.com/jooy2/qsu/actions/workflows/run-test-dart.yml/badge.svg)](https://github.com/jooy2/qsu/actions/workflows/run-test-dart.yml)

**qsu** is a library that collects frequently used utility functions — slugs, text case, date math, number and file size formatting, deep clone and merge, validation, hashing and file helpers. Stop rewriting the same small helpers in every Dart and Flutter project.

```dart
import 'package:qsu/qsu.dart';

getSlug('Hello World!'); // 'hello-world'
fileSizeFormat(1000000); // '976.56 KB'
objMerge([{'a': {'b': 1}}, {'a': {'c': 2}}]); // {a: {b: 1, c: 2}}
```

## Why qsu

- **Top-level functions, no wrapper class.** One import gives you every helper as a plain function — no static class prefix, no instance to construct.
- **Small dependency surface.** Only `crypto`, `path`, `collection` and `unorm_dart`, all first-party or widely used packages.
- **Dart and Flutter.** Pure Dart with no Flutter dependency, so the same package works in a CLI tool, a server and an app.
- **Idiomatic optional arguments.** Options are Dart named parameters with documented defaults, so call sites read clearly and the analyzer checks them.
- **Predictable.** Arguments are validated and edge cases — nulls, empty strings, surrogate pairs, nested lists — return a sensible result instead of throwing.
- **Tested.** The suite runs on Dart 3.5, stable and beta across Linux, macOS and Windows in CI.

## Installation

**qsu** requires `Dart 3.5` or later. On Flutter, that means Flutter `3.24` or later — the Dart version is determined by Flutter, so you do not have to pin it yourself.

### Dart-only

```bash
dart pub add qsu
```

### Flutter

```bash
flutter pub add qsu
```

## How to use

Import `package:qsu/qsu.dart` at the top of the file you want to use. Every function is exported from that single entry point.

```dart
import 'package:qsu/qsu.dart';

void main() {
  print(trim('  hello  ')); // 'hello'
  print(numberFormat(1234567)); // '1,234,567'
  print(capitalizeFirst('abc')); // 'Abc'
  print(isEmail('abc@example.com')); // true
}
```

### Named parameters

Optional arguments are Dart named parameters. Each one has a documented default, so you only pass the ones you want to change:

```dart
fileSizeFormat(100000000, decimals: 3, ceil: true); // '96 MB'
getSlug('Hello World!', separator: '_'); // 'hello_world'
truncate('Hello world', 5, ellipsis: '...'); // 'Hello...'
pad('7', 3, char: '0', position: 'start'); // '007'
```

The reference documentation marks which parameter takes named arguments, and lists every option with its default.

## Examples

```dart
import 'package:qsu/qsu.dart';

void main() {
  // Lists
  arrUnique([1, 1, 2, 3, 3]); // [1, 2, 3]
  arrGroupByMaxCount([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

  // Formatting
  numberFormat(1234567); // '1,234,567'
  duration(1234567890); // '14 Days 6 Hours 56 Minutes 7 Seconds'

  // Maps
  objPick({'a': 1, 'b': 2, 'c': 3}, ['a', 'c']); // {a: 1, c: 3}

  // Strings
  strToCamelCase('foo bar'); // 'fooBar'
  truncate('Hello world', 5, ellipsis: '...'); // 'Hello...'

  // Dates and validation
  today(); // '20xx-xx-xx'
  isEmail('abc@example.com'); // true

  // Hashing
  md5Hash('test'); // '098f6bcd4621d373cade4e832627b4f6'
}
```

A runnable version of this is in [`example/qsu_example.dart`](example/qsu_example.dart).

## API overview

Functions are grouped into categories, all exported from `package:qsu/qsu.dart`.

| Category | Examples                                            |
| -------- | --------------------------------------------------- |
| `array`  | `arrUnique`, `arrGroupByMaxCount`, `sortNumeric`    |
| `crypto` | `md5Hash`, `sha256Hash`, `encodeBase64`, `objectId` |
| `date`   | `today`, `dayDiff`, `createDateListFromRange`       |
| `file`   | `getFileSize`, `moveFile`, `joinFilePath`           |
| `format` | `numberFormat`, `fileSizeFormat`, `duration`        |
| `math`   | `sum`, `clamp`, `round`, `numPick`                  |
| `misc`   | `debounce`, `throttle`, `retry`, `sleep`            |
| `object` | `objClone`, `objMerge`, `objPick`, `objGet`         |
| `string` | `trim`, `truncate`, `strToCamelCase`, `pad`         |
| `verify` | `isEmail`, `isUrl`, `isEmpty`, `isEqual`            |
| `web`    | `getSlug`, `escapeHtml`, `isMobile`, `isBotAgent`   |

The `file` category uses `dart:io`, so those functions are unavailable on Flutter Web. Everything else is platform independent.

## Documentation

Installing and using the package and defining all the utility methods can be found on the documentation page below.

- [Installation](https://qsu.cdget.com/installation)
- [Reference](https://qsu.cdget.com/reference) — every function, with parameters, defaults and examples
- [Changelog](https://qsu.cdget.com/changelog/)

## Development

The package lives in the [qsu monorepo](https://github.com/jooy2/qsu) under `packages/dart`. Source is in `lib/src/<category>.dart`, re-exported from `lib/qsu.dart`.

```bash
dart pub get     # install dependencies
dart test        # run the test suite
dart analyze     # static analysis
dart format .    # format
```

## Contributing

Anyone can contribute to the project by reporting new issues or submitting a pull request. For more information, please see [CONTRIBUTING.md](https://github.com/jooy2/qsu/blob/main/CONTRIBUTING.md).

## License

Please see the [LICENSE](LICENSE) file for more information about project owners, usage rights, and more.
