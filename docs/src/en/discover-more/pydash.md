---
order: 6
menuTitle: pydash
description: Moving a Python project from pydash to qsu, function by function, including the pairs that behave differently.
---

# Moving from pydash to qsu

pydash is a port of Lodash, so its names are Lodash's in `snake_case` and its arguments follow Lodash's. qsu is a port of its own JavaScript package, which was written in the same tradition. The two therefore agree on a lot, and the places where they do not are worth knowing before you swap one call for another.

pydash is also wider than qsu on collections and functional composition, and narrower on formatting, hashing, files and the machine. [Comparison](./comparison) has the wider picture.

## Before you start

qsu needs Python 3.8 or later, so it runs on interpreters pydash has already left behind. Every function comes from the package root:

```python
from qsu import getSlug, arrUnique, fileSizeFormat
```

Two things will surprise you. The names are `camelCase`, which is deliberate: the Python package has to read the same as the JavaScript and Dart ones. And `sum`, `max`, `min` and `round` are real function names here, so importing them by name shadows the builtins. pydash avoids that with a trailing underscore; qsu does not, so import the module instead when it matters:

```python
import qsu

qsu.sum([1, 2, 3])
qsu.round(2.675, 2)
```

Options arrive as keyword arguments, or as a single `dict` in their place.

## Strings

| pydash | qsu | Notes |
| --- | --- | --- |
| `camel_case` | [strToCamelCase](/reference/string/strToCamelCase) |  |
| `kebab_case` | [strToKebabCase](/reference/string/strToKebabCase) |  |
| `snake_case` | [strToSnakeCase](/reference/string/strToSnakeCase) |  |
| `pascal_case` | [strToPascalCase](/reference/string/strToPascalCase) |  |
| `separator_case` | [strToConstantCase](/reference/string/strToConstantCase) | qsu has the one shape rather than a separator argument. |
| `upper_first` | [capitalizeFirst](/reference/string/capitalizeFirst) |  |
| `lower_first` | [uncapitalizeFirst](/reference/string/uncapitalizeFirst) |  |
| `capitalize` | [capitalizeFirst](/reference/string/capitalizeFirst) | **Different.** pydash lowercases the rest of the string by default; qsu leaves it as it is. |
| `start_case`, `title_case`, `human_case` | [capitalizeEachWords](/reference/string/capitalizeEachWords) | **Different.** qsu works on the words the spaces mark and has a `natural` option that keeps short prepositions lowercase. |
| `deburr` | [deburr](/reference/string/deburr) |  |
| `escape`, `unescape` | [escapeHtml](/reference/web/escapeHtml), [unescapeHtml](/reference/web/unescapeHtml) | qsu escapes `&`, `<`, `>`, `"` and `'`. |
| `escape_reg_exp` | [escapeRegExp](/reference/string/escapeRegExp) |  |
| `pad`, `pad_start`, `pad_end` | [pad](/reference/string/pad) | One function with a `position` option. |
| `truncate` | [truncate](/reference/string/truncate) | **Different.** pydash counts the omission inside the length and defaults it to `...`; qsu cuts to the length and appends nothing unless you ask. |
| `trim` | [trim](/reference/string/trim) | **Different.** qsu also collapses runs of whitespace inside the string, and takes no set of characters to strip. |
| `words` | [words](/reference/string/words) |  |
| `split` | [split](/reference/string/split) | qsu splits on several separators in one call. |
| `count_substr` | [strCount](/reference/string/strCount) |  |
| `slugify` | [getSlug](/reference/web/getSlug) | **Different.** qsu keeps non-Latin letters by default, can percent-encode special characters and can build a full URL from a `baseUrl`. |
| `number_format` | [numberFormat](/reference/format/numberFormat) | **Different.** qsu groups the thousands with commas and takes nothing else. |
| `repeat`, `join`, `lines`, `chars`, `quote`, `surround`, `strip_tags`, `prune`, `swap_case` | — | No counterpart, or already in the language. |

## Lists

| pydash | qsu | Notes |
| --- | --- | --- |
| `chunk` | [arrGroupByMaxCount](/reference/array/arrGroupByMaxCount) |  |
| `compact` | [arrCompact](/reference/array/arrCompact) | **Different.** qsu rejects a fixed set of values so that all three packages agree, rather than everything falsy. |
| `difference` | [arrDifference](/reference/array/arrDifference) |  |
| `intersection` | [arrIntersection](/reference/array/arrIntersection) |  |
| `uniq` | [arrUnique](/reference/array/arrUnique) |  |
| `flatten_deep` | [arrTo1dArray](/reference/array/arrTo1dArray) | `flatten`, which goes one level deep, has no counterpart. |
| `shuffle` | [arrShuffle](/reference/array/arrShuffle) |  |
| `sample` | [arrPick](/reference/array/arrPick) | `sample_size` has no counterpart. |
| `count_by` | [arrCount](/reference/array/arrCount) | **Different.** No iteratee, and the values must be strings or numbers. |
| `range_` | [arrWithNumber](/reference/array/arrWithNumber) | **Different.** qsu includes the end value and takes no step. |
| `sort_by` | [sortByObjectKey](/reference/array/sortByObjectKey) | For one key of a list of dicts. |
| `mean` | [average](/reference/array/average) |  |
| `size` | [len](/reference/verify/len) |  |
| `without` | — | `arrDifference(items, [value])`. |
| `group_by`, `key_by`, `order_by`, `partition`, `zip_`, `take`, `drop`, `flat_map` | — | No counterpart. Use `itertools` and comprehensions. |
| — | [arrMove](/reference/array/arrMove), [arrRepeat](/reference/array/arrRepeat), [sortNumeric](/reference/array/sortNumeric), [is2dArray](/reference/verify/is2dArray) | No pydash counterpart. |

## Dicts

| pydash | qsu | Notes |
| --- | --- | --- |
| `clone_deep` | [objClone](/reference/object/objClone) | qsu clones deeply by default. |
| `clone` | [objClone](/reference/object/objClone) with `deep=False` |  |
| `merge` | [objMerge](/reference/object/objMerge) | **Different.** qsu replaces a list whole rather than merging it index by index. |
| `defaults` | [objMerge](/reference/object/objMerge) | **Different.** The later dict wins in `objMerge`, so swap the arguments. |
| `get` | [objGet](/reference/object/objGet) | Dot and bracket paths both work. The default is passed as `fallback`. |
| `invert` | [objInvert](/reference/object/objInvert) |  |
| `map_keys` | [objMapKeys](/reference/object/objMapKeys) |  |
| `pick` | [objPick](/reference/object/objPick) | Top level only. |
| `pick_by` | [objPickBy](/reference/object/objPickBy) | Top level only. |
| `to_pairs` | [objToArray](/reference/object/objToArray) |  |
| `set_`, `update` | [objUpdate](/reference/object/objUpdate) | **Different.** qsu finds a key by name, optionally through the whole tree, rather than walking a path. |
| `parse_int` | [safeParseInt](/reference/format/safeParseInt) | Returns the fallback instead of raising. |
| `omit`, `omit_by`, `unset`, `map_values`, `rename_keys` | — | Invert the test and use `objPickBy`, or write the comprehension. |
| — | [objTo1d](/reference/object/objTo1d), [objToQueryString](/reference/object/objToQueryString), [objToPrettyStr](/reference/object/objToPrettyStr), [objFindItemRecursiveByKey](/reference/object/objFindItemRecursiveByKey) | No pydash counterpart. |

## Numbers, checks and timing

| pydash | qsu | Notes |
| --- | --- | --- |
| `add`, `subtract`, `multiply`, `divide` | [sum](/reference/math/sum), [sub](/reference/math/sub), [mul](/reference/math/mul), [div](/reference/math/div) | qsu takes any number of arguments, or one list. |
| `sum_` | [sum](/reference/math/sum) |  |
| `max_`, `min_` | [max](/reference/math/max), [min](/reference/math/min) | An empty input returns <code>None</code>. |
| `ceil`, `floor`, `round_` | [ceil](/reference/math/ceil), [floor](/reference/math/floor), [round](/reference/math/round) | **Different.** qsu sends ties away from zero, so `round(0.5)` is `1` where Python's own `round` gives `0`. |
| `clamp` | [clamp](/reference/math/clamp) |  |
| `in_range` | [between](/reference/verify/between) | **Different.** The range comes first as a pair, and both ends are excluded unless you pass `inclusive`. |
| `random` | [numPick](/reference/math/numPick) | Whole numbers only. |
| `unique_id` | [numUnique](/reference/math/numUnique) | **Different.** A number derived from the clock, with no prefix argument. |
| `median`, `variance`, `std_deviation`, `power`, `scale`, `transpose` | — | No counterpart. |
| `is_empty` | [isEmpty](/reference/verify/isEmpty) |  |
| `is_equal` | [isEqual](/reference/verify/isEqual), [isEqualStrict](/reference/verify/isEqualStrict) | qsu compares with Python's own `==`, so dicts and lists compare by contents. `isEqual` ignores the type and `isEqualStrict` does not. |
| `is_dict` | [isObject](/reference/verify/isObject) |  |
| `debounce`, `throttle` | [debounce](/reference/misc/debounce), [throttle](/reference/misc/throttle) |  |
| `times` | [funcTimes](/reference/misc/funcTimes) |  |
| `retry` | [retry](/reference/misc/retry) | **Different.** pydash's is a decorator factory; qsu's takes the function and runs it. |
| `delay` | — | [sleep](/reference/misc/sleep) waits; it does not schedule a call. |
| `memoize`, `curry`, `once`, `partial`, `flow`, `iteratee` | — | No counterpart. |

## What qsu adds

- Formatting for people: [fileSizeFormat](/reference/format/fileSizeFormat), [duration](/reference/format/duration), and the `Parts` variants that hand back the number and the unit separately.
- Validation: [isEmail](/reference/verify/isEmail), [isUrl](/reference/verify/isUrl), [isValidDate](/reference/date/isValidDate), [hasBadWords](/reference/verify/hasBadWords).
- Hashing and encryption: [sha256Hash](/reference/crypto/sha256Hash), [md5Hash](/reference/crypto/md5Hash), [encrypt](/reference/crypto/encrypt), [objectId](/reference/crypto/objectId).
- Files and the machine: the [file](/reference/file/getFileInfo) and [os](/reference/os/getCpu) categories.
- The web: [isMobile](/reference/web/isMobile), [isBotAgent](/reference/web/isBotAgent), [isMatchPathname](/reference/web/isMatchPathname), [parseAddress](/reference/net/parseAddress), [urlJoin](/reference/string/urlJoin).
- The same functions in JavaScript and Dart.

## A worked example

Before:

```python
import pydash as _

slug = _.slugify(title)
pages = _.chunk(_.uniq(ids), 20)
config = _.merge({}, defaults, overrides)
label = f'{_.round_(size / 1024 / 1024, 1)} MB'
```

After:

```python
from qsu import getSlug, arrGroupByMaxCount, arrUnique, objMerge, fileSizeFormat

slug = getSlug(title)
pages = arrGroupByMaxCount(arrUnique(ids), 20)
config = objMerge(defaults, overrides)
label = fileSizeFormat(size, 1)
```

The last line is the point of the exercise: the arithmetic was the workaround, and [fileSizeFormat](/reference/format/fileSizeFormat) picks the unit itself.
