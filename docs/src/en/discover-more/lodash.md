---
order: 2
menuTitle: Lodash
description: Moving a JavaScript project from Lodash to qsu, function by function, including the pairs that behave differently.
---

# Moving from Lodash to qsu

Lodash and qsu overlap, but qsu is not a drop-in replacement for it. This page maps the Lodash functions that have a qsu counterpart, marks the pairs that look alike and behave differently, and says plainly which Lodash functions have no answer here.

If you are still deciding, [Comparison](./comparison) covers the shape of the two libraries rather than their function lists.

## Before you start

qsu is ESM only and needs Node 20 or later. Import from the package root, or from a category subpath when you want to keep the import small:

```javascript
import { strToCamelCase, arrUnique } from 'qsu';
import { trim } from 'qsu/string';
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
| `startCase` | [capitalizeEachWords](/reference/string/capitalizeEachWords) | **Different.** Lodash re-splits the string into words; qsu works on the words the spaces mark, and its `natural` option keeps short prepositions lowercase. |
| `deburr` | [deburr](/reference/string/deburr) |  |
| `escape` | [escapeHtml](/reference/web/escapeHtml) | The same five characters. |
| `unescape` | [unescapeHtml](/reference/web/unescapeHtml) |  |
| `escapeRegExp` | [escapeRegExp](/reference/string/escapeRegExp) |  |
| `pad` | [pad](/reference/string/pad) | One function for all three directions. `padStart` is `{ position: 'start' }` and `padEnd` is `{ position: 'end' }`. |
| `truncate` | [truncate](/reference/string/truncate) | **Different.** Lodash counts the omission inside `length`; qsu cuts to `length` and then appends the ellipsis. Lodash's `separator` has no counterpart, but [truncateExpect](/reference/string/truncateExpect) cuts at the end of a sentence. |
| `trim` | [trim](/reference/string/trim) | **Different.** qsu also collapses runs of whitespace inside the string, and it does not take a set of characters to strip. |
| `words` | [words](/reference/string/words) | qsu takes no pattern argument. |
| `split` | [split](/reference/string/split) | qsu splits on several separators in one call. For one separator, use the language's own `split`. |
| `parseInt` | [safeParseInt](/reference/format/safeParseInt) | Returns the `fallback` instead of `NaN`. |
| `repeat` | — | Use `'ab'.repeat(3)`. |
| `toLower`, `toUpper`, `startsWith`, `endsWith`, `replace` | — | Already in the language. |
| `template` | — | No counterpart. |

## Arrays

| Lodash | qsu | Notes |
| --- | --- | --- |
| `chunk` | [arrGroupByMaxCount](/reference/array/arrGroupByMaxCount) |  |
| `compact` | [arrCompact](/reference/array/arrCompact) | The rejected set is fixed rather than left to JavaScript truthiness, so that all three packages agree. |
| `difference` | [arrDifference](/reference/array/arrDifference) |  |
| `intersection` | [arrIntersection](/reference/array/arrIntersection) |  |
| `uniq` | [arrUnique](/reference/array/arrUnique) |  |
| `flattenDeep` | [arrTo1dArray](/reference/array/arrTo1dArray) | `_.flatten`, which goes one level deep, is `array.flat()`. |
| `shuffle` | [arrShuffle](/reference/array/arrShuffle) |  |
| `sample` | [arrPick](/reference/array/arrPick) | `_.sampleSize` has no counterpart. |
| `countBy` | [arrCount](/reference/array/arrCount) | **Different.** No iteratee, and the values must be strings or numbers. |
| `range` | [arrWithNumber](/reference/array/arrWithNumber) | **Different.** qsu includes the end value and takes no step. |
| `fill` | [arrWithDefault](/reference/array/arrWithDefault) | **Different.** qsu builds a new array of the given length instead of writing into an existing one. |
| `sortBy` | [sortByObjectKey](/reference/array/sortByObjectKey) | For one key of an array of objects. Several keys, or an iteratee, have no counterpart. |
| `mean` | [average](/reference/array/average) |  |
| `without` | — | `arrDifference(array, [value])`. |
| `zip`, `unzip`, `take`, `drop`, `head`, `last`, `nth`, `pull`, `remove`, `orderBy`, `groupBy`, `keyBy`, `partition` | — | No counterpart. |
| — | [sortNumeric](/reference/array/sortNumeric) | Sorts strings by the numbers inside them. |
| — | [arrMove](/reference/array/arrMove), [arrRepeat](/reference/array/arrRepeat), [is2dArray](/reference/verify/is2dArray) | No Lodash counterpart. |

## Objects

| Lodash | qsu | Notes |
| --- | --- | --- |
| `cloneDeep` | [objClone](/reference/object/objClone) | qsu clones deeply by default. |
| `clone` | [objClone](/reference/object/objClone) with `{ deep: false }` |  |
| `merge` | [objMerge](/reference/object/objMerge) | **Different.** qsu replaces an array whole where Lodash merges it index by index. |
| `defaults` | [objMerge](/reference/object/objMerge) | **Different.** Swap the arguments: the later object wins in `objMerge`, so `_.defaults(obj, fallback)` becomes `objMerge(fallback, obj)`. `objMerge` also goes down through nested objects. |
| — | [objMergeNewKey](/reference/object/objMergeNewKey) | A deep merge that lets you choose what happens to an array it finds in both objects: keep it, replace it or append to it. |
| `get` | [objGet](/reference/object/objGet) | Dot and bracket paths both work. The default is passed as `{ fallback }`. |
| `invert` | [objInvert](/reference/object/objInvert) |  |
| `mapKeys` | [objMapKeys](/reference/object/objMapKeys) |  |
| `pick` | [objPick](/reference/object/objPick) | Top level only. |
| `pickBy` | [objPickBy](/reference/object/objPickBy) | Top level only. |
| `omit`, `omitBy` | — | Invert the test and use `objPickBy`. |
| `toPairs` | [objToArray](/reference/object/objToArray) |  |
| `set`, `update` | [objUpdate](/reference/object/objUpdate) | **Different.** qsu finds a key by name, optionally through the whole tree, rather than walking a path. |
| `unset` | — | [objDeleteKeyByValue](/reference/object/objDeleteKeyByValue) deletes by value, not by key. |
| `keys`, `values`, `has`, `mapValues`, `forOwn` | — | Already in the language. |
| — | [objTo1d](/reference/object/objTo1d) | Flattens a nested object into one level of dotted keys. |
| — | [objToQueryString](/reference/object/objToQueryString), [objToPrettyStr](/reference/object/objToPrettyStr), [objFindItemRecursiveByKey](/reference/object/objFindItemRecursiveByKey) | No Lodash counterpart. |

## Numbers

| Lodash | qsu | Notes |
| --- | --- | --- |
| `add`, `subtract`, `multiply`, `divide` | [sum](/reference/math/sum), [sub](/reference/math/sub), [mul](/reference/math/mul), [div](/reference/math/div) | qsu takes any number of arguments, or one array. |
| `sum` | [sum](/reference/math/sum) |  |
| `max`, `min` | [max](/reference/math/max), [min](/reference/math/min) | An empty input returns <code>null</code>, not `undefined`. |
| `ceil`, `floor`, `round` | [ceil](/reference/math/ceil), [floor](/reference/math/floor), [round](/reference/math/round) | **Different.** qsu sends ties away from zero, so `round(-0.5)` is `-1` where `_.round(-0.5)` is `-0`. |
| `clamp` | [clamp](/reference/math/clamp) | Same arguments, same order. |
| `inRange` | [between](/reference/verify/between) | **Different.** The range comes first as a pair, and both ends are excluded unless you pass `inclusive`. |
| `random` | [numPick](/reference/math/numPick) | **Different.** Whole numbers only. |
| `uniqueId` | [numUnique](/reference/math/numUnique) | **Different.** A number derived from the clock, with no prefix argument. |

## Functions and timing

| Lodash | qsu | Notes |
| --- | --- | --- |
| `debounce` | [debounce](/reference/misc/debounce) |  |
| `throttle` | [throttle](/reference/misc/throttle) |  |
| `times` | [funcTimes](/reference/misc/funcTimes) |  |
| `delay` | — | [sleep](/reference/misc/sleep) waits; it does not schedule a call. |
| `memoize`, `once`, `curry`, `partial`, `flow`, `negate`, `wrap` | — | No counterpart. |
| — | [retry](/reference/misc/retry) | Runs again on failure, with `times`, `delay` and `backoff`. |

## Type and value checks

| Lodash | qsu | Notes |
| --- | --- | --- |
| `isEmpty` | [isEmpty](/reference/verify/isEmpty) |  |
| `isEqual` | [isEqual](/reference/verify/isEqual), [isEqualStrict](/reference/verify/isEqualStrict) | **Different, and this one bites.** Lodash compares objects deeply. qsu compares them the way JavaScript does, by reference, so two objects with the same contents are not equal. `isEqual` ignores the type and `isEqualStrict` does not. |
| `isObject` | [isObject](/reference/verify/isObject) | **Different.** `_.isObject([])` is <code>true</code>; qsu answers <code>false</code> for an array. |
| `size` | [len](/reference/verify/len) | A missing value counts as `0`. |
| `includes` | [contains](/reference/verify/contains) | qsu also takes a list of candidates and an `exact` option. |
| `isArray`, `isString`, `isNumber`, `isNil`, … | — | Already in the language. |

## What qsu adds

Nothing in Lodash covers these, and they are the usual reason to add qsu next to it rather than in place of it.

- Formatting for people: [fileSizeFormat](/reference/format/fileSizeFormat), [duration](/reference/format/duration), [numberFormat](/reference/format/numberFormat), and the `Parts` variants that hand back the number and the unit separately.
- Web helpers: [getSlug](/reference/web/getSlug), [isBotAgent](/reference/web/isBotAgent), [isMobile](/reference/web/isMobile), [isMatchPathname](/reference/web/isMatchPathname), [urlJoin](/reference/string/urlJoin), [parseAddress](/reference/net/parseAddress).
- Validation: [isEmail](/reference/verify/isEmail), [isUrl](/reference/verify/isUrl), [isValidDate](/reference/date/isValidDate), [hasBadWords](/reference/verify/hasBadWords).
- Hashing and encryption: [sha256Hash](/reference/crypto/sha256Hash), [md5Hash](/reference/crypto/md5Hash), [encrypt](/reference/crypto/encrypt), [objectId](/reference/crypto/objectId).
- Files and the machine: the whole [file](/reference/file/getFileInfo) and [os](/reference/os/getCpu) categories.
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
import {
	strToKebabCase,
	deburr,
	arrGroupByMaxCount,
	arrUnique,
	objMerge,
	fileSizeFormat
} from 'qsu';

const slug = strToKebabCase(deburr(title));
const pages = arrGroupByMaxCount(arrUnique(ids), 20);
const config = objMerge(defaults, overrides);
const label = fileSizeFormat(bytes, 1);
```

The last line is the point of the exercise: the arithmetic was the workaround, and [fileSizeFormat](/reference/format/fileSizeFormat) picks the unit itself.

## Moving over one piece at a time

Both libraries can sit in a project at once. They share no global state and no prototype patching, so there is nothing to keep them apart.

A workable order is to replace the string and formatting calls first, because that is where qsu covers the most ground and the behavioral differences are the easiest to see in a test. Leave `_.isEqual`, `_.set` and anything chained until last, since those are the ones that need the call rewritten rather than renamed.
