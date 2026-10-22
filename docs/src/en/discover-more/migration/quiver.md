---
order: 3
menuTitle: quiver to qsu
description: What moves from quiver to qsu in a Dart project, and what quiver keeps doing that qsu has no answer for.
---

# Moving from quiver to qsu

quiver and qsu are answers to different questions. quiver fills gaps in the Dart SDK: collection types it lacks, iterables in the shape of Python's `itertools`, argument checks, caches and an injectable clock. qsu is a utility belt of finished helpers that happens to be written for three languages.

The result is that this page is as much about what does not move as about what does. Most projects that use quiver should keep using it and add qsu for the parts quiver was never about. [Comparison](../comparison) has the wider picture.

## Before you start

qsu needs Dart 3.5 or later, and everything comes from one import:

```dart
import 'package:qsu/qsu.dart';
```

Optional arguments are Dart named parameters, so `truncate(text, 40, ellipsis: '…')` reads the way a quiver call does. The names are `camelCase` and deliberately not idiomatic Dart — `strToCamelCase` rather than an extension method — because the Dart package has to read the same as the JavaScript and Python ones.

The `os` category reaches the operating system through `dart:ffi` and `/proc`, so it throws an `UnsupportedError` on the web. The `file` category, [fetchData](/reference/net/fetchData) and [logBox](/reference/misc/logBox) are built on `dart:io` and cannot run there either. The rest of the package runs on the web.

## Strings

| quiver | qsu | Notes |
| --- | --- | --- |
| `isEmpty` | [isEmpty](/reference/verify/isEmpty) | qsu's takes any value: a null, a `String`, a `List` or a `Map`. |
| `isBlank` | [isEmpty](/reference/verify/isEmpty) after [collapseWhitespace](/reference/string/collapseWhitespace) | `isEmpty(collapseWhitespace(s))`. qsu has no blank test of its own. |
| `isNotEmpty`, `isNotBlank` | — | Negate the test above. |
| `center` | [pad](/reference/string/pad) | `pad` centres by default, and gives the odd character to the end. |
| `equalsIgnoreCase`, `compareIgnoreCase` | — | No counterpart. Compare the lowercased strings yourself. |
| `loop`, `isDigit`, `isWhitespace` | — | No counterpart. |

qsu's string category is much larger than quiver's, and none of it has a quiver counterpart: the five case conversions built on [words](/reference/string/words), [deburr](/reference/string/deburr), [truncate](/reference/string/truncate), [removeSpecialChars](/reference/string/removeSpecialChars), [strRandom](/reference/string/strRandom), [strByteLength](/reference/string/strByteLength) and the rest.

## Iterables

| quiver | qsu | Notes |
| --- | --- | --- |
| `partition` | [arrChunk](/reference/array/arrChunk) | Same idea: fixed-size groups, the last one short. |
| `range` | [arrRange](/reference/array/arrRange) | **Different.** qsu includes the end value, and its `step` option takes a positive whole number, so it cannot count down or step by fractions. |
| `max`, `min` | [numMax](/reference/math/numMax), [numMin](/reference/math/numMin) | **Different.** qsu's are numeric, take a `List<num>` and accept no comparator. |
| `concat` | — | Use `expand` or the spread operator. |
| `zip`, `cycle`, `enumerate`, `count`, `generate`, `extent`, `merge` | — | No counterpart. |
| — | [arrUnique](/reference/array/arrUnique), [arrDifference](/reference/array/arrDifference), [arrIntersection](/reference/array/arrIntersection), [arrShuffle](/reference/array/arrShuffle), [arrRandom](/reference/array/arrRandom), [arrMove](/reference/array/arrMove), [sortByObjectKey](/reference/array/sortByObjectKey), [sortNatural](/reference/array/sortNatural) | No quiver counterpart. |

## Patterns and checks

| quiver | qsu | Notes |
| --- | --- | --- |
| `escapeRegex` | [escapeRegExp](/reference/string/escapeRegExp) | The same job under a different name. |
| `Glob`, `matchAny`, `matchesFull` | — | [isPathnameMatch](/reference/web/isPathnameMatch) matches URL paths against rules, which is narrower than a glob. |
| `quiver.check` | — | qsu's [verify](/reference/verify/isEmpty) category answers with a boolean rather than throwing, so it does not replace an argument check. |

## Collections, caches, async and time

Most of this does not move.

`BiMap`, `Multimap`, `LruMap`, `TreeSet`, the `Delegating*` wrappers and `MapCache` are data structures, and qsu has none. `Optional` and the `hash*` helpers in `quiver.core` have no counterpart either; [numberHash](/reference/crypto/numberHash) hashes a string to a number and is not a `hashCode` builder.

`listsEqual` and `mapsEqual` compare one level deep with `==`. [isEqualDeep](/reference/verify/isEqualDeep) compares lists and maps by content at every depth, so it agrees with them on flat data and also looks inside the nested lists and maps they compare with `==`. `setsEqual` has no counterpart, since qsu compares a `Set` with `==`; keep quiver's. Do not reach for [isEqualLoose](/reference/verify/isEqualLoose) for any of them: it compares with Dart's own `==`, so two lists with the same contents are **not** equal.

`isLeapYear` and `daysInMonth` from `quiver.time` move to [isLeapYear](/reference/date/isLeapYear) and [getDaysInMonth](/reference/date/getDaysInMonth), which take the same arguments and also count months from 1. The rest of `quiver.time` exists so that time-dependent code can be tested against an injectable `Clock`, and `FakeAsync` in `quiver.testing` exists for the same reason. qsu's [date](/reference/date/today) category formats and compares dates; it does not control the clock.

## What qsu adds

- Formatting for people: [fileSizeFormat](/reference/format/fileSizeFormat), [duration](/reference/format/duration), [numberFormat](/reference/format/numberFormat).
- Objects: [objClone](/reference/object/objClone), [objMerge](/reference/object/objMerge), [objGet](/reference/object/objGet), [objFlatten](/reference/object/objFlatten), [objToQueryString](/reference/object/objToQueryString).
- Validation and the web: [isEmail](/reference/verify/isEmail), [isUrl](/reference/verify/isUrl), [getSlug](/reference/web/getSlug), [escapeHtml](/reference/web/escapeHtml), [parseAddress](/reference/net/parseAddress).
- Hashing and encryption: [sha256Hash](/reference/crypto/sha256Hash), [encrypt](/reference/crypto/encrypt), [objectId](/reference/crypto/objectId).
- Files and machine information: the [file](/reference/file/getFileInfo) and [os](/reference/os/getCpuModel) categories, which no pure-Dart utility package of this kind covers.
- Timing: [debounce](/reference/misc/debounce), [throttle](/reference/misc/throttle), [retry](/reference/misc/retry), [sleep](/reference/misc/sleep).
- The same functions in JavaScript and Python.

## A worked example

Before:

```dart
import 'package:quiver/iterables.dart';
import 'package:quiver/strings.dart';

final batches = partition(ids, 20).toList();
final label = isBlank(title) ? 'Untitled' : title;
final heading = center(label, 40, ' ');
```

After:

```dart
import 'package:qsu/qsu.dart';

final batches = arrChunk(ids, 20);
final label = isEmpty(collapseWhitespace(title)) ? 'Untitled' : title;
final heading = pad(label, 40);
```

`partition` returns a lazy `Iterable` and `arrChunk` returns a `List`, so drop the `.toList()`. That difference runs through the two libraries: quiver is built on lazy iterables, and qsu returns finished values.
