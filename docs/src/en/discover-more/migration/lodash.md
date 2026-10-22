---
order: 1
menuTitle: Lodash to qsu
description: Moving a JavaScript project from Lodash to qsu, function by function, including the pairs that behave differently.
---

# Moving from Lodash to qsu

Lodash and qsu overlap, but qsu is not a drop-in replacement for it. This page maps the Lodash functions that have a qsu counterpart, marks the pairs that look alike and behave differently, and says plainly which Lodash functions have no answer here.

If you are still deciding, [Comparison](../comparison) covers the shape of the two libraries rather than their function lists.

## Before you start

qsu is ESM only and needs Node 20 or later. Import from the package root, or from a category subpath when you want to keep the import small:

```javascript
import { strToCamelCase, arrUnique } from 'qsu';
import { collapseWhitespace } from 'qsu/string';
```

Hashing, files, machine information and `fetchData` need a Node runtime and come from `qsu/node` instead:

```javascript
import { sha256Hash, getFileSize } from 'qsu/node';
```

There is no chained form. `_.chain(x).map(f).uniq().value()` has no counterpart, and neither does the `lodash/fp` build; call the functions one at a time and use the language's own `map` and `filter`.

## Strings

| Lodash | qsu | Notes |
| --- | --- | --- |
| `camelCase` | [strToCamelCase](/reference/string/strToCamelCase) |  |
| `kebabCase` | [strToKebabCase](/reference/string/strToKebabCase) |  |
| `snakeCase` | [strToSnakeCase](/reference/string/strToSnakeCase) |  |
| — | [strToPascalCase](/reference/string/strToPascalCase) | Lodash reaches this through `_.upperFirst(_.camelCase(s))`. |
| — | [strToConstantCase](/reference/string/strToConstantCase) | `_.upperCase` gives `FOO BAR`, not `FOO_BAR`. |
| `upperFirst` | [capitalizeFirst](/reference/string/capitalizeFirst) |  |
| `lowerFirst` | [uncapitalizeFirst](/reference/string/uncapitalizeFirst) |  |
| `capitalize` | [capitalizeFirst](/reference/string/capitalizeFirst) | **Different.** Lodash lowercases the rest of the string; qsu leaves it as it is. |
| `startCase` | [capitalizeEachWord](/reference/string/capitalizeEachWord) | **Different.** Lodash re-splits the string into words; qsu works on the words the spaces mark, and its `titleCase` option keeps short prepositions lowercase. |
| `deburr` | [deburr](/reference/string/deburr) |  |
| `escape` | [escapeHtml](/reference/web/escapeHtml) | The same five characters. |
| `unescape` | [unescapeHtml](/reference/web/unescapeHtml) |  |
| `escapeRegExp` | [escapeRegExp](/reference/string/escapeRegExp) |  |
| `pad` | [pad](/reference/string/pad) | One function for all three directions. `padStart` is `{ position: 'start' }` and `padEnd` is `{ position: 'end' }`. |
| `truncate` | [truncate](/reference/string/truncate) | **Different.** Lodash counts the omission inside `length`; qsu cuts to `length` and then appends the ellipsis. Lodash's `separator` has no counterpart, but [truncateSentence](/reference/string/truncateSentence) cuts at the end of a sentence. |
| `trim` | [collapseWhitespace](/reference/string/collapseWhitespace) | **Different.** qsu also collapses runs of whitespace inside the string, and it does not take a set of characters to strip. |
| `words` | [words](/reference/string/words) | qsu takes no pattern argument. |
| `split` | [split](/reference/string/split) | qsu splits on several separators in one call. For one separator, use the language's own `split`. |
| `parseInt` | [safeParseInt](/reference/format/safeParseInt) | Returns the `fallback` instead of `NaN`. |
| `repeat` | — | Use `'ab'.repeat(3)`. |
| `toLower`, `toUpper`, `startsWith`, `endsWith`, `replace` | — | Already in the language. |
| `template` | — | No counterpart. |

## Arrays

| Lodash | qsu | Notes |
| --- | --- | --- |
| `chunk` | [arrChunk](/reference/array/arrChunk) |  |
| `compact` | [arrCompact](/reference/array/arrCompact) | The rejected set is fixed rather than left to JavaScript truthiness, so that all three packages agree. |
| `difference` | [arrDifference](/reference/array/arrDifference) |  |
| `intersection` | [arrIntersection](/reference/array/arrIntersection) |  |
| `uniq` | [arrUnique](/reference/array/arrUnique) | **Different.** Objects and nested arrays with the same contents are duplicates in qsu; Lodash compares them by reference. |
| `flattenDeep` | [arrFlatten](/reference/array/arrFlatten) | `_.flatten`, which goes one level deep, is `array.flat()`. |
| `shuffle` | [arrShuffle](/reference/array/arrShuffle) |  |
| `sample` | [arrRandom](/reference/array/arrRandom) | `_.sampleSize` has no counterpart. |
| `countBy` | [arrCount](/reference/array/arrCount) | **Different.** No iteratee, and the values must be strings or numbers. |
| `range` | [arrRange](/reference/array/arrRange) | **Different.** qsu includes the end value, and its `step` option takes a positive whole number, so it cannot count down or step by fractions. |
| `fill` | [arrFill](/reference/array/arrFill) | **Different.** qsu builds a new array of the given length instead of writing into an existing one. |
| `sortBy` | [sortByObjectKey](/reference/array/sortByObjectKey) | For one key of an array of objects. Several keys, or an iteratee, have no counterpart. |
| `mean` | [average](/reference/array/average) |  |
| `without` | — | `arrDifference(array, [value])`. |
| `groupBy` | [arrGroupBy](/reference/array/arrGroupBy) | The callback is required; a property name in its place is not accepted. Keys are strings, as they are in Lodash. |
| `zip`, `unzip`, `take`, `drop`, `head`, `last`, `nth`, `pull`, `remove`, `orderBy`, `keyBy`, `partition` | — | No counterpart. |
| — | [sortNatural](/reference/array/sortNatural) | Sorts strings by the numbers inside them. |
| — | [arrMove](/reference/array/arrMove), [arrRepeat](/reference/array/arrRepeat), [isNestedArray](/reference/verify/isNestedArray) | No Lodash counterpart. |

## Objects

| Lodash | qsu | Notes |
| --- | --- | --- |
| `cloneDeep` | [objClone](/reference/object/objClone) | qsu clones deeply by default. |
| `clone` | [objClone](/reference/object/objClone) with `{ deep: false }` |  |
| `merge` | [objMerge](/reference/object/objMerge) | **Different.** qsu replaces an array whole where Lodash merges it index by index. |
| `defaults` | [objMerge](/reference/object/objMerge) | **Different.** Swap the arguments: the later object wins in `objMerge`, so `_.defaults(obj, fallback)` becomes `objMerge(fallback, obj)`. `objMerge` also goes down through nested objects. |
| — | [objMergeWithArrays](/reference/object/objMergeWithArrays) | A deep merge that lets you choose what happens to an array it finds in both objects: keep it, replace it or append to it. |
| `get` | [objGet](/reference/object/objGet) | Dot and bracket paths both work. The default is passed as `{ fallback }`. |
| `invert` | [objInvert](/reference/object/objInvert) |  |
| `mapKeys` | [objMapKeys](/reference/object/objMapKeys) |  |
| `pick` | [objPick](/reference/object/objPick) | Top level only. |
| `pickBy` | [objPickBy](/reference/object/objPickBy) | Top level only. |
| `omit` | [objOmit](/reference/object/objOmit) | **Different.** Top-level keys only; Lodash also takes deep paths. |
| `omitBy` | — | Invert the test and use `objPickBy`. |
| `toPairs` | [objToEntries](/reference/object/objToEntries) |  |
| `set` | [objSet](/reference/object/objSet) | **Different.** qsu returns a new object and leaves the one you pass alone, where Lodash writes into it. A missing level is always created as an object, even for a numeric key such as `[0]`, where Lodash creates an array. |
| `update` | [objGet](/reference/object/objGet), then [objSet](/reference/object/objSet) | Read the value, compute the new one and write it back. qsu has no updater callback. |
| `unset` | — | [objOmitByValue](/reference/object/objOmitByValue) deletes by value, not by key. |
| `keys`, `values`, `has`, `mapValues`, `forOwn` | — | Already in the language. |
| — | [objFlatten](/reference/object/objFlatten) | Flattens a nested object into one level of dotted keys. |
| — | [objToQueryString](/reference/object/objToQueryString), [objToPrettyJson](/reference/object/objToPrettyJson), [objFindInTree](/reference/object/objFindInTree) | No Lodash counterpart. |

## Numbers

| Lodash | qsu | Notes |
| --- | --- | --- |
| `add`, `subtract`, `multiply`, `divide` | [numSum](/reference/math/numSum), [sub](/reference/math/sub), [mul](/reference/math/mul), [div](/reference/math/div) | qsu takes any number of arguments, or one array. |
| `sum` | [numSum](/reference/math/numSum) |  |
| `max`, `min` | [numMax](/reference/math/numMax), [numMin](/reference/math/numMin) | An empty input returns <code>null</code>, not `undefined`. |
| `ceil`, `floor`, `round` | [ceil](/reference/math/ceil), [floor](/reference/math/floor), [numRound](/reference/math/numRound) | **Different.** qsu sends ties away from zero, so `numRound(-0.5)` is `-1` where `_.round(-0.5)` is `-0`. |
| `clamp` | [clamp](/reference/math/clamp) | Same arguments, same order. |
| `inRange` | [between](/reference/verify/between) | **Different.** The range comes first as a pair, and both ends are excluded unless you pass `inclusive`. |
| `random` | [numRandom](/reference/math/numRandom) | **Different.** Whole numbers only. |
| `uniqueId` | [numUniqueId](/reference/math/numUniqueId) | **Different.** A number derived from the clock, with no prefix argument. |

## Functions and timing

| Lodash | qsu | Notes |
| --- | --- | --- |
| `debounce` | [debounce](/reference/misc/debounce) |  |
| `throttle` | [throttle](/reference/misc/throttle) |  |
| `times` | [times](/reference/misc/times) |  |
| `delay` | — | [sleep](/reference/misc/sleep) waits; it does not schedule a call. |
| `memoize`, `once`, `curry`, `partial`, `flow`, `negate`, `wrap` | — | No counterpart. |
| — | [retry](/reference/misc/retry) | Runs again on failure, with `attempts`, `delay` and `backoff`. |

## Type and value checks

| Lodash | qsu | Notes |
| --- | --- | --- |
| `isEmpty` | [isEmpty](/reference/verify/isEmpty) |  |
| `isEqual` | [isEqualDeep](/reference/verify/isEqualDeep) | **Different.** Arrays, plain objects and dates compare by content, as in Lodash. A `Map`, a `Set` or a class instance is compared with `===`, where Lodash compares those by content too. Do not reach for qsu's [isEqualLoose](/reference/verify/isEqualLoose): it compares objects by reference. |
| `isObject` | [isPlainObject](/reference/verify/isPlainObject) | **Different.** `_.isObject([])` is <code>true</code>; qsu answers <code>false</code> for an array. |
| `size` | [len](/reference/verify/len) | A missing value counts as `0`. |
| `includes` | [contains](/reference/verify/contains) | qsu also takes a list of candidates and an `exact` option. |
| `isArray`, `isString`, `isNumber`, `isNil`, … | — | Already in the language. |

## What qsu adds

Nothing in Lodash covers these, and they are the usual reason to add qsu next to it rather than in place of it.

- Formatting for people: [fileSizeFormat](/reference/format/fileSizeFormat), [duration](/reference/format/duration), [numberFormat](/reference/format/numberFormat), and the `Parts` variants that hand back the number and the unit separately.
- Web helpers: [getSlug](/reference/web/getSlug), [isBot](/reference/web/isBot), [isMobileDeviceFromUa](/reference/web/isMobileDeviceFromUa), [isPathnameMatch](/reference/web/isPathnameMatch), [joinUrl](/reference/string/joinUrl), [parseAddress](/reference/net/parseAddress).
- Validation: [isEmail](/reference/verify/isEmail), [isUrl](/reference/verify/isUrl), [isValidDate](/reference/date/isValidDate), [hasBadWords](/reference/verify/hasBadWords).
- Hashing and encryption: [sha256Hash](/reference/crypto/sha256Hash), [md5Hash](/reference/crypto/md5Hash), [encrypt](/reference/crypto/encrypt), [objectId](/reference/crypto/objectId).
- Files and the machine: the whole [file](/reference/file/getFileInfo) and [os](/reference/os/getCpuModel) categories.
- The same functions in Dart and Python.

## A worked example

Before:

```javascript
import _ from 'lodash';

const slug = _.kebabCase(_.deburr(title));
const pages = _.chunk(_.uniq(ids), 20);
const config = _.merge({}, defaults, overrides);
const label = `${_.round(bytes / 1024 / 1024, 1)} MB`;
```

After:

```javascript
import { strToKebabCase, deburr, arrChunk, arrUnique, objMerge, fileSizeFormat } from 'qsu';

const slug = strToKebabCase(deburr(title));
const pages = arrChunk(arrUnique(ids), 20);
const config = objMerge(defaults, overrides);
const label = fileSizeFormat(bytes, 1);
```

The last line is the point of the exercise: the arithmetic was the workaround, and [fileSizeFormat](/reference/format/fileSizeFormat) picks the unit itself.

## Moving over one piece at a time

Both libraries can sit in a project at once. They share no global state and no prototype patching, so there is nothing to keep them apart.

A workable order is to replace the string and formatting calls first, because that is where qsu covers the most ground and the behavioral differences are the easiest to see in a test. Leave `_.set` and anything chained until last, since those are the ones that need the call rewritten rather than renamed: [objSet](/reference/object/objSet) returns a new object where `_.set` changed the one it was given.
