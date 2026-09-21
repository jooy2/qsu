---
order: 5
menuTitle: basic_utils
description: Moving a Dart project from basic_utils to qsu, with the function map and the differences that matter.
---

# Moving from basic_utils to qsu

basic_utils is the Dart package closest in spirit to qsu: a bag of finished helpers for strings, numbers, iterables, email addresses and domains. It also carries a large certificate and cryptography section built on X.509, PKCS12 and ASN.1, and that half has no counterpart here at all.

So the move is usually partial. The string, math and iterable helpers map well; the certificate work, the DNS lookups and the colour handling do not. [Comparison](./comparison) has the wider picture.

## Before you start

basic_utils groups its functions into classes of static methods, so you write `StringUtils.capitalize(s)`. qsu exports top-level functions from one import:

```dart
import 'package:qsu/qsu.dart';
```

That means names can collide with something already in scope. `max`, `min`, `trim`, `split` and `contains` are the ones to watch; import qsu with a prefix if a file needs both. qsu's [max](/reference/math/max) and [min](/reference/math/min) in particular shadow the ones in `dart:math`.

Optional arguments are named parameters in both packages, so that part of a call does not change.

## Strings

| basic_utils | qsu | Notes |
| --- | --- | --- |
| `StringUtils.capitalize` | [capitalizeFirst](/reference/string/capitalizeFirst) | **Different.** basic_utils trims the string and lowercases everything after the first letter; qsu changes the first letter and leaves the rest alone. |
| `StringUtils.capitalize` with `allWords: true` | [capitalizeEachWords](/reference/string/capitalizeEachWords) | qsu also has a `natural` option that keeps short prepositions lowercase. |
| `StringUtils.camelCaseToLowerUnderscore` | [strToSnakeCase](/reference/string/strToSnakeCase) | qsu splits with [words](/reference/string/words), so spaces and hyphens are separators too. |
| `StringUtils.camelCaseToUpperUnderscore` | [strToConstantCase](/reference/string/strToConstantCase) |  |
| `StringUtils.toPascalCase` | [strToPascalCase](/reference/string/strToPascalCase) | qsu also has [strToCamelCase](/reference/string/strToCamelCase) and [strToKebabCase](/reference/string/strToKebabCase). |
| `StringUtils.truncate` | [truncate](/reference/string/truncate) | **Different.** The trailing symbol defaults to `...` in basic_utils and to nothing in qsu, so pass `ellipsis: '...'` to keep the old output. |
| `StringUtils.countChars` | [strCount](/reference/string/strCount) | **Different.** qsu counts a substring of any length and is always case-sensitive. |
| `StringUtils.inList` | [contains](/reference/verify/contains) | **Different.** The list comes first: `contains(list, s)`. There is no case-insensitive form. |
| `StringUtils.isNullOrEmpty` | [isEmpty](/reference/verify/isEmpty) | qsu's takes any value, not only a `String`. |
| `StringUtils.generateRandomString` | [strRandom](/reference/string/strRandom) | **Different.** qsu takes a length and nothing else: letters and digits, no alphabet options. |
| `StringUtils.hidePartial` | [strBlindRandom](/reference/string/strBlindRandom) | **Different.** basic_utils masks a range you choose; qsu masks positions it picks at random. |
| `StringUtils.equalsIgnoreCase`, `isAscii`, `isDigit`, `isLowerCase`, `isUpperCase`, `isPalindrome`, `reverse`, `chunk`, `addCharAtPosition`, `removeCharAtPosition`, `removeExp`, `pickOnly`, `defaultString` | — | No counterpart. |
| — | [deburr](/reference/string/deburr), [pad](/reference/string/pad), [trim](/reference/string/trim), [words](/reference/string/words), [removeSpecialChar](/reference/string/removeSpecialChar), [removeNewLine](/reference/string/removeNewLine), [replaceBetween](/reference/string/replaceBetween), [getStrBytes](/reference/string/getStrBytes), [escapeRegExp](/reference/string/escapeRegExp) | No basic_utils counterpart. |

## Iterables

| basic_utils | qsu | Notes |
| --- | --- | --- |
| `IterableUtils.chunk` | [arrGroupByMaxCount](/reference/array/arrGroupByMaxCount) |  |
| `IterableUtils.intersection` | [arrIntersection](/reference/array/arrIntersection) | qsu takes any number of lists. |
| `IterableUtils.subtract` | [arrDifference](/reference/array/arrDifference) | qsu takes any number of lists. |
| `IterableUtils.randomItem` | [arrPick](/reference/array/arrPick) |  |
| `IterableUtils.containsAny` | [contains](/reference/verify/contains) | `contains(list, others)` is true when any of them is found. |
| `IterableUtils.size` | [len](/reference/verify/len) |  |
| `IterableUtils.isNullOrEmpty` | [isEmpty](/reference/verify/isEmpty) |  |
| `IterableUtils.union` | — | `arrUnique([...a, ...b])`. |
| `IterableUtils.containsAll`, `permutate`, `swap`, `zip`, `emptyIfNull` | — | No counterpart. |
| — | [arrUnique](/reference/array/arrUnique), [arrShuffle](/reference/array/arrShuffle), [arrCompact](/reference/array/arrCompact), [arrMove](/reference/array/arrMove), [arrTo1dArray](/reference/array/arrTo1dArray), [sortByObjectKey](/reference/array/sortByObjectKey), [sortNumeric](/reference/array/sortNumeric) | No basic_utils counterpart. |

## Numbers

| basic_utils | qsu | Notes |
| --- | --- | --- |
| `MathUtils.round` | [round](/reference/math/round) | qsu also has [ceil](/reference/math/ceil) and [floor](/reference/math/floor) with the same arguments, and ties go away from zero. |
| `MathUtils.mean` | [average](/reference/array/average) |  |
| `MathUtils.getRandomNumber` | [numPick](/reference/math/numPick) | **Different.** `min` and `max` are positional and both are required. |
| `MathUtils.median`, `log10`, `log2`, `logBase`, the geometry and unit conversions | — | No counterpart. |
| — | [sum](/reference/math/sum), [sub](/reference/math/sub), [mul](/reference/math/mul), [div](/reference/math/div), [clamp](/reference/math/clamp), [max](/reference/math/max), [min](/reference/math/min), [numUnique](/reference/math/numUnique) | No basic_utils counterpart. |

## Addresses, dates and the rest

| basic_utils | qsu | Notes |
| --- | --- | --- |
| `EmailUtils` | [isEmail](/reference/verify/isEmail) | **Different.** qsu answers yes or no; it does not take an address apart. |
| `DomainUtils` | [parseAddress](/reference/net/parseAddress) | **Different.** `parseAddress` splits a whole address into its parts, including IPv4, IPv6 and SSH-style strings. It has no public-suffix list, so it cannot tell a subdomain from a domain. |
| `HttpUtils` | [fetchData](/reference/net/fetchData) | qsu's returns the body whatever the status, rather than throwing. |
| `CryptoUtils.getHash` | [sha256Hash](/reference/crypto/sha256Hash) and the other hashes | **Different.** qsu hashes a string, not a byte list. |
| `DateUtils` | — | Neither of its two methods has a counterpart. qsu's [date](/reference/date/today) category does different work: [today](/reference/date/today), [dateToYYYYMMDD](/reference/date/dateToYYYYMMDD), [dayDiff](/reference/date/dayDiff), [isValidDate](/reference/date/isValidDate), [createDateListFromRange](/reference/date/createDateListFromRange). |
| `X509Utils`, `PKCS12Utils`, `ASN1Utils`, `HexUtils`, `DnsUtils`, `ColorUtils`, `EnumUtils`, `BooleanUtils`, `SortUtils` | — | No counterpart. Keep basic_utils for these. |

## What qsu adds

- Formatting for people: [fileSizeFormat](/reference/format/fileSizeFormat), [duration](/reference/format/duration), [numberFormat](/reference/format/numberFormat), [safeJSONParse](/reference/format/safeJSONParse).
- Objects: [objClone](/reference/object/objClone), [objMerge](/reference/object/objMerge), [objGet](/reference/object/objGet), [objTo1d](/reference/object/objTo1d), [objToQueryString](/reference/object/objToQueryString) and the rest of the [object](/reference/object/objClone) category.
- The web: [getSlug](/reference/web/getSlug), [escapeHtml](/reference/web/escapeHtml), [isMobile](/reference/web/isMobile), [isBotAgent](/reference/web/isBotAgent), [isMatchPathname](/reference/web/isMatchPathname).
- Files and machine information: the [file](/reference/file/getFileInfo) and [os](/reference/os/getCpu) categories.
- Timing: [debounce](/reference/misc/debounce), [throttle](/reference/misc/throttle), [retry](/reference/misc/retry), [sleep](/reference/misc/sleep).
- The same functions in JavaScript and Python.

## A worked example

Before:

```dart
import 'package:basic_utils/basic_utils.dart';

final title = StringUtils.capitalize(raw);
final short = StringUtils.truncate(title, 40);
final batches = IterableUtils.chunk(ids, 20);
final rounded = MathUtils.round(ratio, 2);
```

After:

```dart
import 'package:qsu/qsu.dart';

final title = capitalizeFirst(trim(raw));
final short = truncate(title, 40, ellipsis: '...');
final batches = arrGroupByMaxCount(ids, 20);
final rounded = round(ratio, 2);
```

Two of those lines need the change spelled out. `capitalize` trims and lowercases the tail, so the `trim` is explicit here and the tail keeps its own case. `truncate` has to be told what to append, because qsu appends nothing by default.
