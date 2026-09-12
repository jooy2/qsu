---
layout: home

title: QSU
titleTemplate: Powerful utility library

hero:
  name: QSU
  text: Quick & Simple Utility
  tagline: The helpers every project ends up writing by hand, with the same name and the same behavior in JavaScript, Dart and Python. Slugs, text case, date math, file sizes, deep clone and merge, validation, hashing.
  actions:
    - theme: brand
      text: Get started
      link: installation
    - theme: alt
      text: Reference
      link: reference
    - theme: alt
      text: Introduction
      link: introduction
  image:
    src: /icon.png
    alt: qsu

features:
  - icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h14"/><path d="m14 5 3 3-3 3"/><path d="M21 16H7"/><path d="m10 13-3 3 3 3"/></svg>
    title: One API, three languages
    details: The same camelCase name, the same arguments and the same result in every package. Moving between a Node.js server, a Flutter app and a Python script does not mean relearning your utility belt.
    link: /introduction
    linkText: What qsu is
  - icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" fill="currentColor" opacity="0.25"/></svg>
    title: Thirteen categories to reach for
    details: Arrays, objects, strings, dates, math, formatting, validation, hashing, files, the machine and the web. Every function has a page of its own with its parameters, its return type and its examples.
    link: /reference
    linkText: Browse the reference
  - icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4h-.5A3.5 3.5 0 0 0 5 7.5v2A2.5 2.5 0 0 1 2.5 12 2.5 2.5 0 0 1 5 14.5v2A3.5 3.5 0 0 0 8.5 20H9"/><path d="M15 4h.5A3.5 3.5 0 0 1 19 7.5v2a2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0-2.5 2.5v2a3.5 3.5 0 0 1-3.5 3.5H15"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/></svg>
    title: Typed in every package
    details: TypeScript declarations ship with the npm package, every Dart signature is annotated, and the Python package is marked py.typed so mypy and your editor can read it.
  - icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21V7"/><path d="m12 13 3.6-3.6"/><path d="M12 16 8.4 12.4" stroke-dasharray="2 2.6"/><circle cx="12" cy="5" r="2"/><circle cx="17" cy="8" r="2"/></svg>
    title: Only what you import
    details: The JavaScript package is ESM, marked side-effect free and has no runtime dependencies, so a bundler keeps the functions you called and drops the rest. Every category also has a subpath of its own.
    link: /installation
    linkText: How to install it
  - icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4.5 5.8v5.9c0 4.2 3.2 7.4 7.5 8.3 4.3-.9 7.5-4.1 7.5-8.3V5.8L12 3Z"/><path d="m9 12 2 2 4-4"/></svg>
    title: Tested on every platform
    details: Each package runs its suite on Linux, macOS and Windows across several runtime versions. The three suites are ports of each other, so one behavior is what they all check.
  - icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7.2C10.6 5.8 8.6 5.2 4.5 5.2v12c4.1 0 6.1.6 7.5 2 1.4-1.4 3.4-2 7.5-2v-12c-4.1 0-6.1.6-7.5 2Z"/><path d="M12 7.2v12"/></svg>
    title: Documented in two languages
    details: Every reference page is written in English and Korean, and the whole site rewrites its examples, its parameter rules and its type names for the package you picked.
    link: /reference
    linkText: Read the reference
---

## One folder of helpers, three languages

Every project grows the same folder of small utilities, and every language grows its own copy of it. qsu is that folder, written once and published to npm, pub.dev and PyPI, so the call you already know keeps working when the stack changes.

<div class="home-parity">

```javascript
// JavaScript / Node.js
import { getSlug } from 'qsu';

getSlug('Hello World!');
// 'hello-world'
```

```dart
// Dart / Flutter
import 'package:qsu/qsu.dart';

getSlug('Hello World!');
// 'hello-world'
```

```python
# Python
from qsu import getSlug

getSlug('Hello World!')
# 'hello-world'
```

</div>

<p class="home-note">Same name, same arguments, same result.</p>

## What it looks like in use

Take a language here. Every example below is written for it, and so is every page of the reference.

<LangTabs />

### Text, slugs and case

::: lang js

```javascript
import { getSlug, strToCamelCase, truncate } from 'qsu';

getSlug('Hello World'); // 'hello-world'
strToCamelCase('--foo-bar--'); // 'fooBar'
truncate('hello', 2, '...'); // 'he...'
```

:::

::: lang dart

```dart
import 'package:qsu/qsu.dart';

getSlug('Hello World'); // 'hello-world'
strToCamelCase('--foo-bar--'); // 'fooBar'
truncate('hello', 2, ellipsis: '...'); // 'he...'
```

:::

::: lang python

```python
from qsu import getSlug, strToCamelCase, truncate

getSlug('Hello World')  # 'hello-world'
strToCamelCase('--foo-bar--')  # 'fooBar'
truncate('hello', 2, '...')  # 'he...'
```

:::

### Dates, sizes and durations

::: lang js

```javascript
import { today, dayDiff, fileSizeFormat, duration } from 'qsu';

today(); // 'YYYY-MM-DD'
dayDiff(new Date('2021-01-01'), new Date('2021-01-03')); // 2
fileSizeFormat(100000000, 3); // '95.367 MB'
duration(604800000); // '7 Days'
```

:::

::: lang dart

```dart
import 'package:qsu/qsu.dart';

today(); // 'YYYY-MM-DD'
dayDiff(DateTime(2021, 1, 1), DateTime(2021, 1, 3)); // 2
fileSizeFormat(100000000, decimals: 3); // '95.367 MB'
duration(604800000); // '7 Days'
```

:::

::: lang python

```python
from datetime import datetime
from qsu import today, dayDiff, fileSizeFormat, duration

today()  # 'YYYY-MM-DD'
dayDiff(datetime(2021, 1, 1), datetime(2021, 1, 3))  # 2
fileSizeFormat(100000000, 3)  # '95.367 MB'
duration(604800000)  # '7 Days'
```

:::

### Arrays, objects and checks

::: lang js

```javascript
import { arrUnique, objMerge, isEmail } from 'qsu';

arrUnique([1, 2, 2, 3]); // [1, 2, 3]
objMerge({ a: { b: 1 } }, { a: { c: 2 } }); // { a: { b: 1, c: 2 } }
isEmail('abc@def.com'); // true
```

:::

::: lang dart

```dart
import 'package:qsu/qsu.dart';

arrUnique([1, 2, 2, 3]); // [1, 2, 3]
objMerge([{'a': {'b': 1}}, {'a': {'c': 2}}]); // {'a': {'b': 1, 'c': 2}}
isEmail('abc@def.com'); // true
```

:::

::: lang python

```python
from qsu import arrUnique, objMerge, isEmail

arrUnique([1, 2, 2, 3])  # [1, 2, 3]
objMerge({'a': {'b': 1}}, {'a': {'c': 2}})  # {'a': {'b': 1, 'c': 2}}
isEmail('abc@def.com')  # True
```

:::

## What is inside

Thirteen categories, counted for the language you are reading in. A package that does not carry a category says so rather than showing an empty one.

<CategoryGrid :rows="[
	{ name: 'array', desc: 'Creation, sorting, sampling, deduplication and grouping.' },
	{ name: 'crypto', desc: 'Hashing, base64, symmetric encryption and id generation.' },
	{ name: 'date', desc: 'Validation, formatting and range calculation.' },
	{ name: 'file', desc: 'File and directory inspection, path handling and reading or writing.' },
	{ name: 'format', desc: 'Readable sizes, durations and numbers, and parsing that does not throw.' },
	{ name: 'math', desc: 'Arithmetic over argument lists or arrays, and random numbers.' },
	{ name: 'misc', desc: 'Debounce, throttle, retry, sleep and other helpers around a function.' },
	{ name: 'net', desc: 'Network requests.' },
	{ name: 'object', desc: 'Traversal, merging, flattening and conversion.' },
	{ name: 'os', desc: 'Facts about the machine the process is running on.' },
	{ name: 'string', desc: 'Transformation, capitalization, trimming and truncation.' },
	{ name: 'verify', desc: 'Type, equality, range and format validation.' },
	{ name: 'web', desc: 'URLs, slugs, user agents and other helpers for the browser.' }
]" />

## Start with your language

Install the package you need. The documentation follows the language you take here, and so does every page you open after it.

<StartCards :cards="[
	{ id: 'js', note: 'Node.js 18 or later. ESM only, with a Node.js subpath for the functions that need a runtime.', install: 'npm install qsu', link: '/installation' },
	{ id: 'dart', note: 'Dart 3.5 or later, which Flutter 3.24 and up already ship.', install: 'dart pub add qsu', link: '/installation' },
	{ id: 'python', note: 'Python 3.8 or later, installable with pip, uv, Poetry or PDM.', install: 'pip install qsu', link: '/installation' }
]" />

<div class="home-cta">

[Introduction](/introduction) [Reference](/reference/index.md) [Changelog](/changelog/)

</div>
