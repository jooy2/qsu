---
order: 4
menuTitle: quiver
description: What moves from quiver to qsu in a Dart project, and what quiver keeps doing that qsu has no answer for.
---

# Moving from quiver to qsu

quiver and qsu are answers to different questions. quiver fills gaps in the Dart SDK: collection types it lacks, iterables in the shape of Python's `itertools`, argument checks, caches and an injectable clock. qsu is a utility belt of finished helpers that happens to be written for three languages.

The result is that this page is as much about what does not move as about what does. Most projects that use quiver should keep using it and add qsu for the parts quiver was never about. [Comparison](./comparison) has the wider picture.

## Before you start

qsu needs Dart 3.5 or later, and everything comes from one import:

```dart
import 'package:qsu/qsu.dart';
```

Optional arguments are Dart named parameters, so `truncate(text, 40, ellipsis: '…')` reads the way a quiver call does. The names are `camelCase` and deliberately not idiomatic Dart — `strToCamelCase` rather than an extension method — because the Dart package has to read the same as the JavaScript and Python ones.

The `os` category reaches the operating system through `dart:ffi` and `/proc`, so it throws an `UnsupportedError` on the web. The rest of the package runs there.

## Strings

| quiver | qsu | Notes |
| --- | --- | --- |
| `isEmpty` | [isEmpty](/reference/verify/isEmpty) | qsu's takes any value: a null, a `String`, a `List` or a `Map`. |
| `isBlank` | [isEmpty](/reference/verify/isEmpty) after [trim](/reference/string/trim) | `isEmpty(trim(s))`. qsu has no blank test of its own. |
| `isNotEmpty`, `isNotBlank` | — | Negate the test above. |
| `center` | [pad](/reference/string/pad) | `pad` centres by default, and gives the odd character to the end. |
| `equalsIgnoreCase`, `compareIgnoreCase` | — | No counterpart. Compare the lowercased strings yourself. |
| `loop`, `isDigit`, `isWhitespace` | — | No counterpart. |

qsu's string category is much larger than quiver's, and none of it has a quiver counterpart: the five case conversions built on [words](/reference/string/words), [deburr](/reference/string/deburr), [truncate](/reference/string/truncate), [removeSpecialChar](/reference/string/removeSpecialChar), [strRandom](/reference/string/strRandom), [getStrBytes](/reference/string/getStrBytes) and the rest.

## Iterables

| quiver | qsu | Notes |
| --- | --- | --- |
| `partition` | [arrGroupByMaxCount](/reference/array/arrGroupByMaxCount) | Same idea: fixed-size groups, the last one short. |
| `range` | [arrWithNumber](/reference/array/arrWithNumber) | **Different.** qsu includes the end value and takes no step. |
| `max`, `min` | [max](/reference/math/max), [min](/reference/math/min) | **Different.** qsu's are numeric, take a `List<num>` and accept no comparator. They also shadow the ones in `dart:math`, so a file that needs both has to import one of them with a prefix. |
| `concat` | — | Use `expand` or the spread operator. |
| `zip`, `cycle`, `enumerate`, `count`, `generate`, `extent`, `merge` | — | No counterpart. |
| — | [arrUnique](/reference/array/arrUnique), [arrDifference](/reference/array/arrDifference), [arrIntersection](/reference/array/arrIntersection), [arrShuffle](/reference/array/arrShuffle), [arrPick](/reference/array/arrPick), [arrMove](/reference/array/arrMove), [sortByObjectKey](/reference/array/sortByObjectKey), [sortNumeric](/reference/array/sortNumeric) | No quiver counterpart. |

## Patterns and checks

| quiver | qsu | Notes |
| --- | --- | --- |
| `escapeRegex` | [escapeRegExp](/reference/string/escapeRegExp) | The same job under a different name. |
| `Glob`, `matchAny`, `matchesFull` | — | [isMatchPathname](/reference/web/isMatchPathname) matches URL paths against rules, which is narrower than a glob. |
| `quiver.check` | — | qsu's [verify](/reference/verify/isEmpty) category answers with a boolean rather than throwing, so it does not replace an argument check. |

## Collections, caches, async and time

None of this moves.

`BiMap`, `Multimap`, `LruMap`, `TreeSet`, the `Delegating*` wrappers and `MapCache` are data structures, and qsu has none. `Optional` and the `hash*` helpers in `quiver.core` have no counterpart either; [numberHash](/reference/crypto/numberHash) hashes a string to a number and is not a `hashCode` builder.

`listsEqual`, `mapsEqual` and `setsEqual` look like [isEqual](/reference/verify/isEqual), and they are not. qsu's `isEqual` compares with Dart's own `==`, so two lists with the same contents are **not** equal. Keep quiver's.

`quiver.time` exists so that time-dependent code can be tested against an injectable `Clock`, and `FakeAsync` in `quiver.testing` exists for the same reason. qsu's [date](/reference/date/today) category formats and compares dates; it does not control the clock.

## What qsu adds

- Formatting for people: [fileSizeFormat](/reference/format/fileSizeFormat), [duration](/reference/format/duration), [numberFormat](/reference/format/numberFormat).
- Objects: [objClone](/reference/object/objClone), [objMerge](/reference/object/objMerge), [objGet](/reference/object/objGet), [objTo1d](/reference/object/objTo1d), [objToQueryString](/reference/object/objToQueryString).
- Validation and the web: [isEmail](/reference/verify/isEmail), [isUrl](/reference/verify/isUrl), [getSlug](/reference/web/getSlug), [escapeHtml](/reference/web/escapeHtml), [parseAddress](/reference/net/parseAddress).
- Hashing and encryption: [sha256Hash](/reference/crypto/sha256Hash), [encrypt](/reference/crypto/encrypt), [objectId](/reference/crypto/objectId).
- Files and machine information: the [file](/reference/file/getFileInfo) and [os](/reference/os/getCpu) categories, which no pure-Dart utility package of this kind covers.
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

final batches = arrGroupByMaxCount(ids, 20);
final label = isEmpty(trim(title)) ? 'Untitled' : title;
final heading = pad(label, 40);
```

`partition` returns a lazy `Iterable` and `arrGroupByMaxCount` returns a `List`, so drop the `.toList()`. That difference runs through the two libraries: quiver is built on lazy iterables, and qsu returns finished values.
