---
order: 1
menuTitle: Comparison
description: qsu next to Lodash, Underscore.js, quiver, basic_utils, pydash and boltons, area by area.
---

# qsu next to the other utility libraries

qsu is not the first utility library any of its three languages has had, and for most projects it will not be the only one. This page says what it covers, what the better-known alternatives cover, and which of them is the right answer for a given job.

Pick a language in the sidebar and the comparison follows it. Each library also has a [migration guide](/discover-more/) of its own.

## The libraries compared

::: lang js

**[Lodash](https://lodash.com)** is the one almost every JavaScript project has met. It is a large, stable collection built around arrays, objects and strings, with a functional layer on top: currying, chaining, iteratee shorthands and a `fp` build.

**[Underscore.js](https://underscorejs.org)** came first and is smaller. Lodash started as a fork of it, so the two share most of their names, and Underscore has since kept to a narrower set rather than growing to match.

:::

::: lang dart

**[quiver](https://pub.dev/packages/quiver)** is published by Google under Apache-2.0. It reads as a set of additions to the SDK rather than a utility belt: iterables in the shape of Python's `itertools`, collection types the SDK lacks such as `BiMap` and `Multimap`, caches, argument checks and an injectable `Clock`.

**[basic_utils](https://pub.dev/packages/basic_utils)** is a collection of `*Utils` classes with static methods: `StringUtils`, `MathUtils`, `IterableUtils`, `EmailUtils`, `DomainUtils`, `HttpUtils`, `DnsUtils` and a large certificate and cryptography section built on `X509Utils`, `PKCS12Utils` and `ASN1Utils`.

:::

::: lang python

**[pydash](https://pydash.readthedocs.io)** is a port of Lodash. The names are the same in `snake_case`, the arguments follow Lodash's, and the chaining and callback shorthands come with them.

**[boltons](https://boltons.readthedocs.io)** is a set of pure-Python modules "in the same spirit as the standard library": `strutils`, `iterutils`, `fileutils`, `timeutils`, `cacheutils` and about twenty more. It reads as the parts of the standard library that were never written, so it follows `stdlib` naming rather than any library's own.

:::

## Feature sheet

Every row is one question, asked of qsu and of the two libraries beside it. The sheet follows the language switch, so the columns are the ones your ecosystem has, and a question only one ecosystem can answer — certificates in Dart, atomic writes in Python — appears only on that sheet.

Read a mark as a starting point rather than a verdict. Two functions can both earn a check and still differ in their arguments, their defaults or their edge cases, which is what the migration guides are for.

<FeatureMatrix />

## What qsu does not do

The table above is drawn around qsu, so here is the other direction.

qsu has no chaining, no currying and no callback shorthand. Every function is called on its own and given real arguments, which is why there is no `_.chain`, no `fp` build and no iteratee written as a string or an object.

It has no higher-order function toolkit either: nothing for `memoize`, `once`, `curry`, `partial` or function composition. `debounce`, `throttle` and `retry` are there because they solve a timing problem, not because qsu wraps functions in general.

It leaves to the language whatever the language already does well. Mapping, filtering, reducing, sorting, slicing, grouping and joining are all one call in modern JavaScript, Dart and Python, so qsu does not reimplement them.

::: lang js

Lodash also carries pieces qsu has no counterpart for at any level: `_.template`, the sorted-index family, `_.zip` and `_.unzip`, `_.orderBy` with several keys and directions, and the mutating helpers `_.pull`, `_.remove` and `_.fill`.

:::

::: lang dart

quiver's collection types have no counterpart in qsu. If you need a `BiMap`, a `Multimap`, an `LruMap` or a `TreeSet`, that is what quiver is for, and nothing in qsu replaces it. The same goes for its injectable `Clock`, which exists so that time-dependent code can be tested.

basic_utils reaches much further into certificates than qsu does. qsu hashes, encodes and encrypts; it does not read or write X.509, PKCS12 or ASN.1.

:::

::: lang python

pydash carries the whole functional layer that qsu leaves out, and much of its collection API returns to what `map`, `filter` and `itertools` already give you. boltons goes deeper than qsu on nested data with `remap` and `research`, on atomic file writes with `atomic_save`, and on data structures such as `OrderedMultiDict` and `IndexedSet`.

:::

## How the API is shaped

Every qsu function is a plain function with a `camelCase` name. Optional arguments arrive as one options value at the end, written as an object in JavaScript, as named parameters in Dart and as keyword arguments or a single `dict` in Python. There is one name per behavior rather than a family: [pad](/reference/string/pad) takes a `position` option instead of splitting into three functions, and [objClone](/reference/object/objClone) takes `deep` instead of being two.

::: lang js

Lodash and Underscore both put the data first and return a new value, which is the same shape as a qsu call. What differs is the layer above it. Lodash accepts a property name, an object or an array where a callback is expected, and `_.get` and `_.set` read a path written as a string. qsu takes callbacks as callbacks; only [objGet](/reference/object/objGet) reads a path.

:::

::: lang dart

quiver and basic_utils are shaped differently from each other. quiver exports top-level functions, so `isBlank(s)` reads the way `trim(s)` does in qsu. basic_utils groups everything into classes of static methods, so the same call is `StringUtils.isNullOrEmpty(s)`. qsu follows quiver here: the functions are top-level and imported from one place.

The name is where qsu is deliberately unidiomatic. `strToCamelCase` rather than `toCamelCase` or an extension method, because the Dart package must read the same as the JavaScript and Python ones.

:::

::: lang python

pydash suffixes the names that collide with builtins, so you write `pydash.map_`, `pydash.filter_` and `pydash.sum_`. boltons follows the standard library and puts each group in its own module, so you import `from boltons.strutils import slugify`.

qsu does neither. The names are `camelCase` in Python too, and they are imported from the package root. That is not idiomatic Python, and it is the price of the API being identical in three languages.

:::

## Where the code runs

::: lang js

qsu is ESM only and needs Node 20 or later. It has no dependencies, it is marked side-effect free, and each category has a subpath of its own, so `import { trim } from 'qsu/string'` pulls in that category alone. Anything that needs a Node runtime lives behind `qsu/node`, which keeps the browser-safe half browser-safe. The TypeScript types are part of the package.

Lodash's published entry point is a single CommonJS file with no `exports` map; the ESM build is a separate package, `lodash-es`, and tree-shaking a bundle depends on using it. Underscore ships both builds from one package through conditional exports. Neither ships its own type declarations, so both are typed from DefinitelyTyped.

:::

::: lang dart

qsu needs Dart 3.5 or later and depends on `path`, `crypto`, `unorm_dart`, `ffi` and `pointycastle`. The `os` category reaches the operating system through `dart:ffi` on macOS and Windows and through `/proc` on Linux and Android, so it throws an `UnsupportedError` on the web while the rest of the package keeps working there.

quiver is pure Dart and carries one dependency. basic_utils is pure Dart as well but pulls in several of its own, including an HTTP client and a cryptography implementation, which is what the certificate half of the package is built on.

:::

::: lang python

qsu needs Python 3.8 or later and depends on `cryptography`, which is what the `crypto` category is built on.

pydash is pure Python and needs 3.10 or later, so it is the one to check first if you are held on an older interpreter. boltons is pure Python with no dependencies at all and supports a wider range of versions than either.

:::

## The part that is only qsu

The same function, under the same name, with the same result, in JavaScript, Dart and Python. A service whose API is written in Node, whose app is written in Flutter and whose data jobs are written in Python can slugify a title, format a file size, validate an email address and hash a value the same way in all three, and a developer moving between them keeps their utility belt.

None of the libraries on this page tries to do that, because none of them has anywhere to do it. Lodash is JavaScript, quiver is Dart, boltons is Python. pydash comes closest by porting Lodash's names, but a port is a resemblance rather than a guarantee: the two projects are maintained separately and neither is answerable to the other's behavior.

Parity is not a slogan here. It is enforced by the tests, which are ported alongside the implementation, and the few functions that exist in only one package are [marked as such](/reference/) rather than quietly missing.

## Which to use

Use Lodash, quiver, basic_utils, pydash or boltons for what they are good at. They do not conflict with qsu, and there is no reason to remove one just to add the other.

Reach for qsu when you want one API across languages, when you need what it covers and the other library does not (file sizes, durations, slugs, hashing, machine information, file handling), or when you would otherwise write the helper yourself for the fourth time.

Stay where you are when you depend on a functional layer qsu does not have, when your code is built on a collection type it does not provide, or when the helpers you use are already in your language's standard library.
