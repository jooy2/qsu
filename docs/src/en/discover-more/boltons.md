---
order: 7
menuTitle: boltons
description: What moves from boltons to qsu in a Python project, and what boltons keeps doing that qsu has no answer for.
---

# Moving from boltons to qsu

boltons is "the standard library that was never written": pure-Python modules that follow `stdlib` naming and fill gaps rather than build an API of their own. qsu is a utility belt with one API in three languages. The two overlap on strings, iterables and a little of the file and maths work, and diverge everywhere else.

Most projects using boltons should keep it. This page says which calls have a qsu counterpart, which look alike and are not, and where boltons is simply the better tool. [Comparison](./comparison) has the wider picture.

## Before you start

qsu needs Python 3.8 or later. boltons puts each group in its own module; qsu exports everything from the package root:

```python
from qsu import getSlug, fileSizeFormat, arrUnique
```

`sum`, `max`, `min` and `round` are real function names in qsu, so importing them by name shadows the builtins. Import the module instead when that matters:

```python
import qsu

qsu.round(2.675, 2)
```

Options arrive as keyword arguments, or as a single `dict` in their place. Unlike boltons, qsu returns finished lists rather than generators, so there is no `_iter` variant of anything.

## strutils

| boltons | qsu | Notes |
| --- | --- | --- |
| `camel2under` | [strToSnakeCase](/reference/string/strToSnakeCase) | **Different.** qsu splits with [words](/reference/string/words), so spaces, hyphens and digit runs are boundaries too. |
| `under2camel` | [strToPascalCase](/reference/string/strToPascalCase) | boltons capitalizes the first segment as well, which is Pascal case. For a lowercase first word use [strToCamelCase](/reference/string/strToCamelCase). |
| `slugify` | [getSlug](/reference/web/getSlug) | **Different.** boltons joins with `_` by default and qsu with `-`. qsu keeps non-Latin letters, can percent-encode special characters and can build a full URL from a `baseUrl`. |
| `bytes2human` | [fileSizeFormat](/reference/format/fileSizeFormat) | **Different.** boltons writes `126K`; qsu writes `125.97 KB` and can be switched to the IEC or SI units and to whole words. |
| `asciify` | [deburr](/reference/string/deburr) | **Different.** `asciify` returns bytes and drops what it cannot transliterate; `deburr` returns a string and only unaccents Latin letters. |
| `ellipsize` | [truncate](/reference/string/truncate) | **Different.** `ellipsize` cuts at a word boundary and appends `…` by default. qsu cuts at the length and appends nothing unless you ask. [truncateExpect](/reference/string/truncateExpect) cuts at the end of a sentence instead. |
| `is_ascii` | — | [strToAscii](/reference/string/strToAscii) converts; it does not test. |
| `html2text` | — | [unescapeHtml](/reference/web/unescapeHtml) turns entities back into characters but leaves tags alone. |
| `indent`, `strip_ansi`, `ordinalize`, `pluralize`, `singularize`, `cardinalize`, `a10n`, `find_hashtags`, `multi_replace`, `unwrap_text`, `parse_int_list`, `format_int_list`, `args2cmd`, `gzip_bytes` | — | No counterpart. |
| — | The five case conversions, [pad](/reference/string/pad), [trim](/reference/string/trim), [words](/reference/string/words), [strCount](/reference/string/strCount), [strRandom](/reference/string/strRandom), [removeSpecialChar](/reference/string/removeSpecialChar), [replaceBetween](/reference/string/replaceBetween), [escapeRegExp](/reference/string/escapeRegExp), [getStrBytes](/reference/string/getStrBytes) | No boltons counterpart. |

## iterutils

| boltons | qsu | Notes |
| --- | --- | --- |
| `chunked` | [arrGroupByMaxCount](/reference/array/arrGroupByMaxCount) | **Different.** qsu does not pad the last group. |
| `unique` | [arrUnique](/reference/array/arrUnique) | **Different.** qsu takes no `key` function. |
| `flatten` | [arrTo1dArray](/reference/array/arrTo1dArray) | Both go all the way down. |
| `get_path` | [objGet](/reference/object/objGet) | **Different.** boltons takes a tuple of steps; qsu takes one string in dot or bracket notation, and returns a `fallback` rather than raising. |
| `redundant` | [arrCount](/reference/array/arrCount) | **Different.** qsu returns a count for every value, not only the repeated ones, and the values must be strings or numbers. |
| `same` | [isEqual](/reference/verify/isEqual) | **Different.** `isEqual(first, rest)` compares one value against the others. |
| `backoff` | [retry](/reference/misc/retry) | **Different.** boltons hands you the delays; qsu's `retry` runs the function and waits between attempts itself. |
| `remap`, `research` | — | [objFindItemRecursiveByKey](/reference/object/objFindItemRecursiveByKey) and [objUpdate](/reference/object/objUpdate) with `recursive` cover a corner of this, and nothing covers `remap` in general. Keep boltons. |
| `bucketize`, `partition`, `windowed`, `pairwise`, `first`, `one`, `split`, `strip`, `soft_sorted`, `frange`, `is_iterable`, `is_scalar`, `is_collection` | — | No counterpart. |
| — | [arrDifference](/reference/array/arrDifference), [arrIntersection](/reference/array/arrIntersection), [arrCompact](/reference/array/arrCompact), [arrShuffle](/reference/array/arrShuffle), [arrPick](/reference/array/arrPick), [arrMove](/reference/array/arrMove), [sortByObjectKey](/reference/array/sortByObjectKey), [sortNumeric](/reference/array/sortNumeric) | No boltons counterpart. |

## fileutils, mathutils and timeutils

| boltons | qsu | Notes |
| --- | --- | --- |
| `fileutils.mkdir_p` | [createDirectory](/reference/file/createDirectory) | Both ignore a directory that is already there. |
| `fileutils.atomic_save`, `AtomicSaver`, `atomic_rename`, `copytree`, `iter_find_files`, `rotate_file`, `FilePerms` | — | No counterpart. This is what boltons is for; qsu does not attempt atomic writes. |
| `mathutils.clamp` | [clamp](/reference/math/clamp) | **Different.** qsu requires both bounds. |
| `mathutils.ceil`, `floor` | [ceil](/reference/math/ceil), [floor](/reference/math/floor) | **Different.** boltons snaps to a value from a list; qsu rounds to a number of decimal places. |
| `statsutils` | [average](/reference/array/average) | **Different.** `average` is the mean and nothing else. Keep `statsutils` for the median, the variance and the quantiles. |
| `timeutils.daterange` | [createDateListFromRange](/reference/date/createDateListFromRange) | **Different.** boltons yields `date` objects and takes a step; qsu returns every day in the range as `YYYY-MM-DD` strings. |
| `timeutils.relative_time` | [duration](/reference/format/duration) | **Different.** `relative_time` writes the distance from now; `duration` writes a span given in milliseconds. |
| `timeutils.isoparse`, `strpdate`, `parse_timedelta`, `dt_to_timestamp` | — | No counterpart. |
| `urlutils` | [parseAddress](/reference/net/parseAddress) | **Different.** boltons gives you a URL object you can change and write back; `parseAddress` returns the parts and stops there. |
| `cacheutils`, `dictutils`, `listutils`, `setutils`, `queueutils`, `tbutils`, `funcutils`, `ioutils`, `jsonutils`, `socketutils`, `typeutils` | — | No counterpart. These are data structures and infrastructure, which qsu has none of. |

## What qsu adds

- Objects: [objClone](/reference/object/objClone), [objMerge](/reference/object/objMerge), [objPick](/reference/object/objPick), [objTo1d](/reference/object/objTo1d), [objToQueryString](/reference/object/objToQueryString), [objInvert](/reference/object/objInvert).
- Validation: [isEmail](/reference/verify/isEmail), [isUrl](/reference/verify/isUrl), [isValidDate](/reference/date/isValidDate), [between](/reference/verify/between), [hasBadWords](/reference/verify/hasBadWords).
- Hashing and encryption: [sha256Hash](/reference/crypto/sha256Hash), [md5Hash](/reference/crypto/md5Hash), [encrypt](/reference/crypto/encrypt), [encodeBase64](/reference/crypto/encodeBase64), [objectId](/reference/crypto/objectId).
- The machine: the whole [os](/reference/os/getCpu) category, from [getCpu](/reference/os/getCpu) to [getFreeDiskSize](/reference/os/getFreeDiskSize).
- The web: [isMobile](/reference/web/isMobile), [isBotAgent](/reference/web/isBotAgent), [escapeHtml](/reference/web/escapeHtml), [isMatchPathname](/reference/web/isMatchPathname).
- Timing: [debounce](/reference/misc/debounce), [throttle](/reference/misc/throttle), [sleep](/reference/misc/sleep).
- The same functions in JavaScript and Dart.

## A worked example

Before:

```python
from boltons.strutils import slugify, bytes2human
from boltons.iterutils import chunked, unique

slug = slugify(title, delim='-')
label = bytes2human(size, 2)
pages = chunked(unique(ids), 20)
```

After:

```python
from qsu import getSlug, fileSizeFormat, arrGroupByMaxCount, arrUnique

slug = getSlug(title)
label = fileSizeFormat(size, 2)
pages = arrGroupByMaxCount(arrUnique(ids), 20)
```

The two labels are not the same string. `bytes2human(128991, 2)` gives `125.97K` and `fileSizeFormat(128991, 2)` gives `125.97 KB`, so anything that parses the output has to be looked at.
