![logo](https://raw.githubusercontent.com/jooy2/qsu/refs/heads/main/.github/resources/qsu-logo.webp)

# qsu - Quick & Simple Utility

[![PyPI version](https://img.shields.io/pypi/v/qsu)](https://pypi.org/project/qsu/) [![PyPI downloads](https://img.shields.io/pypi/dm/qsu)](https://pypi.org/project/qsu/) [![PyPI python versions](https://img.shields.io/pypi/pyversions/qsu)](https://pypi.org/project/qsu/) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jooy2/qsu/blob/main/LICENSE) [![test](https://github.com/jooy2/qsu/actions/workflows/run-test-python.yml/badge.svg)](https://github.com/jooy2/qsu/actions/workflows/run-test-python.yml)

**qsu** is a library that collects frequently used utility functions — slugs, text case, date math, number and file size formatting, deep clone and merge, validation, hashing, file and OS helpers. Stop rewriting the same small helpers in every project.

```python
from qsu import getSlug, fileSizeFormat, objMerge

getSlug('Hello World!')  # 'hello-world'
fileSizeFormat(1000000)  # '976.56 KB'
objMerge({'a': {'b': 1}}, {'a': {'c': 2}})  # {'a': {'b': 1, 'c': 2}}
```

## Why qsu

- **Flat, one-import API.** Every function is available straight from the top-level `qsu` package — no submodule spelunking, no classes to instantiate.
- **Cheap to import.** Categories and functions are resolved on first access (PEP 562), so `import qsu` does not drag in `cryptography`, `subprocess` and `urllib` for code that never touches them.
- **Typed.** The package ships a `py.typed` marker and full annotations, so mypy and other checkers follow every name to the function behind it.
- **Predictable.** Arguments are validated and edge cases — `None`, empty values, nested lists, non-string input — return a sensible result instead of raising.
- **Tested.** The suite runs on Python 3.9, 3.11 and 3.13 across Linux, macOS and Windows in CI.

Function names are `camelCase` rather than `snake_case`. That is deliberate: qsu keeps one API shape across every language it ships in, so `getSlug` is `getSlug` wherever you use it.

## Installation

**qsu** requires `Python 3.8` or later.

```bash
pip install qsu
```

**qsu** is published to PyPI, so modern package managers such as [uv](https://docs.astral.sh/uv), [Poetry](https://python-poetry.org) and [PDM](https://pdm-project.org) install it from their default index without any extra configuration:

```bash
uv add qsu
```

```bash
poetry add qsu
```

```bash
pdm add qsu
```

If you use `uv` outside of a project — in a plain virtual environment, for example — use the pip-compatible command instead:

```bash
uv pip install qsu
```

The only runtime dependency is [`cryptography`](https://pypi.org/project/cryptography/), used by the `encrypt` and `decrypt` helpers. It is imported the first time one of them is used, not at `import qsu`.

## How to use

Import the functions you need directly from `qsu`:

```python
from qsu import capitalizeFirst, strCount

print(capitalizeFirst('abcd'))  # 'Abcd'
print(strCount('123412341234', '1'))  # 3
```

You can also import a single category, or the package as a whole:

```python
from qsu.string import truncate
from qsu.web import getSlug

import qsu

qsu.today()  # '20xx-xx-xx'
```

### Options: keyword arguments or a dict

Functions with optional settings accept them either as keyword arguments or as a single `dict`. Both forms behave identically, so pick whichever reads better at the call site:

```python
pad('7', 3, char='0', position='start')  # '007'
pad('7', 3, {'char': '0', 'position': 'start'})  # '007'
```

## Examples

```python
from qsu import (
    arrUnique,
    arrGroupByMaxCount,
    duration,
    numberFormat,
    objPick,
    strToCamelCase,
    truncate,
    isEmail,
    md5Hash,
)

# Lists
arrUnique([1, 1, 2, 3, 3])  # [1, 2, 3]
arrGroupByMaxCount([1, 2, 3, 4, 5], 2)  # [[1, 2], [3, 4], [5]]

# Formatting
numberFormat(1234567)  # '1,234,567'
duration(1234567890)  # '14 Days 6 Hours 56 Minutes 7 Seconds'

# Dicts
objPick({'a': 1, 'b': 2, 'c': 3}, ['a', 'c'])  # {'a': 1, 'c': 3}

# Strings
strToCamelCase('foo bar')  # 'fooBar'
truncate('Hello world', 5, '...')  # 'Hello...'

# Validation and hashing
isEmail('abc@example.com')  # True
md5Hash('test')  # '098f6bcd4621d373cade4e832627b4f6'
```

## API overview

Functions are grouped into categories. Each one is importable from the top-level package or from its own module.

| Category | Module       | Examples                                            |
| -------- | ------------ | --------------------------------------------------- |
| `array`  | `qsu.array`  | `arrUnique`, `arrGroupByMaxCount`, `sortNumeric`    |
| `crypto` | `qsu.crypto` | `md5Hash`, `sha256Hash`, `encodeBase64`, `objectId` |
| `date`   | `qsu.date`   | `today`, `dayDiff`, `createDateListFromRange`       |
| `file`   | `qsu.file`   | `getFileSize`, `moveFile`, `joinFilePath`           |
| `format` | `qsu.format` | `numberFormat`, `fileSizeFormat`, `duration`        |
| `math`   | `qsu.math`   | `sum`, `clamp`, `round`, `numPick`                  |
| `misc`   | `qsu.misc`   | `debounce`, `throttle`, `retry`, `sleep`            |
| `net`    | `qsu.net`    | `fetchData`                                         |
| `object` | `qsu.object` | `objClone`, `objMerge`, `objPick`, `objGet`         |
| `os`     | `qsu.os`     | `getCpu`, `getRamSize`, `runCommand`                |
| `string` | `qsu.string` | `trim`, `truncate`, `strToCamelCase`, `pad`         |
| `verify` | `qsu.verify` | `isEmail`, `isUrl`, `isEmpty`, `isEqual`            |
| `web`    | `qsu.web`    | `getSlug`, `escapeHtml`, `isMobile`, `isBotAgent`   |

The `math` category provides `sum`, `min`, `max`, `round`, `floor` and `ceil`. Importing those names directly shadows the Python builtins for the rest of the module, so reach for them as `qsu.sum(...)` — or import them under an alias — when you need both.

## Documentation

Installing and using the package and defining all the utility methods can be found on the documentation page below.

- [Installation](https://qsu.cdget.com/installation)
- [Reference](https://qsu.cdget.com/reference) — every function, with parameters, defaults and examples
- [Changelog](https://qsu.cdget.com/changelog/)

## Development

The package lives in the [qsu monorepo](https://github.com/jooy2/qsu) under `packages/python`. Source is one function per file, in `qsu/<category>/<functionName>.py`.

```bash
pip install -e ".[dev]"   # install with test and type-check dependencies
pytest                    # run the test suite
mypy                      # type check
```

## Contributing

Anyone can contribute to the project by reporting new issues or submitting a pull request. For more information, please see [CONTRIBUTING.md](https://github.com/jooy2/qsu/blob/main/CONTRIBUTING.md).

## License

Please see the [LICENSE](LICENSE) file for more information about project owners, usage rights, and more.
