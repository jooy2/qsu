---
order: 3
menuTitle: Underscore.js
description: Moving a JavaScript project from Underscore.js to qsu, with the function map and the differences that matter.
---

# Moving from Underscore.js to qsu

Underscore is the smaller of the two libraries qsu is usually compared with, and the overlap is smaller with it too. Underscore's strength is collection work — `each`, `map`, `reduce`, `groupBy`, `pluck` — and almost all of that is in the language now. qsu does not attempt it.

What is left after that is a short list, so this page is short. [Lodash](./lodash) covers the names the two libraries share in more detail; where a function has the same name in both, the notes there apply here as well.

## Before you start

qsu is ESM only and needs Node 20 or later. It has no global object to attach to, so there is no `_` and no `_.mixin`:

```javascript
import { arrUnique, strToKebabCase } from 'qsu';
```

There is no `_.chain(…).value()`, no `_.iteratee` shorthand and no `_.template`. Hashing, files, machine information and `fetchData` come from `qsu/node`.

## Arrays and collections

| Underscore | qsu | Notes |
| --- | --- | --- |
| `compact` | [arrCompact](/reference/array/arrCompact) | qsu rejects a fixed set of values rather than everything falsy. |
| `chunk` | [arrGroupByMaxCount](/reference/array/arrGroupByMaxCount) |  |
| `difference` | [arrDifference](/reference/array/arrDifference) |  |
| `intersection` | [arrIntersection](/reference/array/arrIntersection) |  |
| `uniq` | [arrUnique](/reference/array/arrUnique) |  |
| `flatten` | [arrTo1dArray](/reference/array/arrTo1dArray) | Both go all the way down. qsu takes no depth argument. |
| `shuffle` | [arrShuffle](/reference/array/arrShuffle) |  |
| `sample` | [arrPick](/reference/array/arrPick) | qsu returns one element and takes no count. |
| `countBy` | [arrCount](/reference/array/arrCount) | **Different.** No iteratee, and the values must be strings or numbers. |
| `range` | [arrWithNumber](/reference/array/arrWithNumber) | **Different.** qsu includes the end value and takes no step. |
| `sortBy` | [sortByObjectKey](/reference/array/sortByObjectKey) | For one key of an array of objects. An iteratee has no counterpart. |
| `size` | [len](/reference/verify/len) | Works on any value; a missing one counts as `0`. |
| `contains` | [contains](/reference/verify/contains) | **Different.** qsu takes a string as well as a list, and the second argument may be a list of candidates. |
| `without` | — | `arrDifference(array, [value])`. |
| `union` | — | `arrUnique([...a, ...b])`. |
| `each`, `map`, `reduce`, `filter`, `find`, `every`, `some`, `pluck`, `groupBy`, `indexBy`, `partition`, `zip`, `first`, `last` | — | Already in the language. |

## Objects

| Underscore | qsu | Notes |
| --- | --- | --- |
| `clone` | [objClone](/reference/object/objClone) with `{ deep: false }` | qsu clones deeply unless you say otherwise; Underscore's `clone` is shallow. |
| `extend` | [objMerge](/reference/object/objMerge) | **Different.** `objMerge` goes down through nested objects and returns a new object rather than writing into the first one. |
| `defaults` | [objMerge](/reference/object/objMerge) | **Different.** The later object wins in `objMerge`, so `_.defaults(obj, fallback)` becomes `objMerge(fallback, obj)`. |
| `invert` | [objInvert](/reference/object/objInvert) |  |
| `pick` | [objPick](/reference/object/objPick), [objPickBy](/reference/object/objPickBy) | `objPick` takes keys, `objPickBy` takes a test. |
| `pairs` | [objToArray](/reference/object/objToArray) |  |
| `get` | [objGet](/reference/object/objGet) | Dot and bracket paths both work. The default is passed as `{ fallback }`. |
| `isEmpty` | [isEmpty](/reference/verify/isEmpty) |  |
| `isEqual` | [isEqual](/reference/verify/isEqual) | **Different, and this one bites.** Underscore compares objects deeply. qsu compares them the way JavaScript does, by reference. |
| `omit`, `mapObject`, `findKey`, `keys`, `values`, `has` | — | No counterpart, or already in the language. |
| — | [objTo1d](/reference/object/objTo1d), [objToQueryString](/reference/object/objToQueryString), [objUpdate](/reference/object/objUpdate) | No Underscore counterpart. |

## Utilities

| Underscore | qsu | Notes |
| --- | --- | --- |
| `escape` | [escapeHtml](/reference/web/escapeHtml) | **Different.** Underscore also escapes the backtick; qsu escapes the five characters that carry meaning in HTML. |
| `unescape` | [unescapeHtml](/reference/web/unescapeHtml) |  |
| `times` | [funcTimes](/reference/misc/funcTimes) |  |
| `random` | [numPick](/reference/math/numPick) | Whole numbers, and both ends are included. |
| `uniqueId` | [numUnique](/reference/math/numUnique) | **Different.** A number derived from the clock, with no prefix argument. |
| `max`, `min` | [max](/reference/math/max), [min](/reference/math/min) | qsu takes numbers or one array of numbers, not an iteratee. |
| `debounce` | [debounce](/reference/misc/debounce) |  |
| `throttle` | [throttle](/reference/misc/throttle) |  |
| `delay`, `defer`, `memoize`, `once`, `partial`, `compose`, `bind`, `identity`, `constant`, `noop`, `template`, `now` | — | No counterpart. |

## What qsu adds

Everything Underscore never set out to do, which is most of qsu:

- Strings: case conversion ([strToCamelCase](/reference/string/strToCamelCase) and its four siblings), [deburr](/reference/string/deburr), [pad](/reference/string/pad), [truncate](/reference/string/truncate), [trim](/reference/string/trim), [words](/reference/string/words), [escapeRegExp](/reference/string/escapeRegExp).
- Formatting for people: [fileSizeFormat](/reference/format/fileSizeFormat), [duration](/reference/format/duration), [numberFormat](/reference/format/numberFormat).
- Web and validation: [getSlug](/reference/web/getSlug), [isEmail](/reference/verify/isEmail), [isUrl](/reference/verify/isUrl), [isMobile](/reference/web/isMobile), [parseAddress](/reference/net/parseAddress).
- Hashing, files and machine information, from `qsu/node`.
- The same functions in Dart and Python.

## A worked example

Before:

```javascript
import _ from 'underscore';

const tags = _.uniq(_.compact(input.split(',')));
const pages = _.chunk(tags, 20);
const settings = _.defaults({}, given, fallback);
const safe = _.escape(comment);
```

After:

```javascript
import { arrUnique, arrCompact, arrGroupByMaxCount, objMerge, escapeHtml } from 'qsu';

const tags = arrUnique(arrCompact(input.split(',')));
const pages = arrGroupByMaxCount(tags, 20);
const settings = objMerge(fallback, given);
const safe = escapeHtml(comment);
```

The arguments to the merge are the other way round, because the last object wins in `objMerge` while the first one wins in `_.defaults`. The escaped output differs too: Underscore turns a backtick into `&#x60;` and qsu leaves it alone.
