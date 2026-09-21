---
order: 7
menuTitle: boltons
description: Python 프로젝트에서 boltons 대신 qsu를 쓸 수 있는 부분과, boltons를 그대로 둬야 하는 부분을 정리했습니다.
---

# boltons에서 qsu로 옮기기

boltons는 "쓰이지 않은 표준 라이브러리"입니다. 자기만의 API를 만들기보다 표준 라이브러리의 이름 관례를 따르며 빈자리를 채우는 순수 Python 모듈 모음입니다. qsu는 세 언어에서 같은 API를 쓰는 유틸리티 모음입니다. 둘은 문자열과 이터러블, 파일과 수학의 일부에서 겹치고 나머지에서는 갈라집니다.

boltons를 쓰는 프로젝트라면 대부분 그대로 두는 편이 낫습니다. 이 문서는 어떤 호출에 qsu 대응이 있는지, 어떤 것이 이름만 닮았는지, 어디에서 boltons가 그냥 더 나은지를 정리합니다. 전체 그림은 [비교](./comparison)에 있습니다.

## 시작하기 전에

qsu는 Python 3.8 이상이 필요합니다. boltons는 그룹마다 모듈을 두지만 qsu는 패키지 루트에서 전부 내보냅니다.

```python
from qsu import getSlug, fileSizeFormat, arrUnique
```

`sum`, `max`, `min`, `round`는 qsu의 실제 함수 이름이라서 이름으로 가져오면 내장 함수를 가립니다. 문제가 되는 곳에서는 모듈을 가져와 쓰세요.

```python
import qsu

qsu.round(2.675, 2)
```

옵션은 키워드 인자로 받거나, 그 자리에 `dict` 하나로 받습니다. boltons와 달리 qsu는 제너레이터가 아니라 완성된 리스트를 돌려주므로 `_iter` 형태의 함수가 없습니다.

## strutils

| boltons | qsu | 비고 |
| --- | --- | --- |
| `camel2under` | [strToSnakeCase](/ko/reference/string/strToSnakeCase) | **다릅니다.** qsu는 [words](/ko/reference/string/words)로 나누므로 공백과 하이픈, 연속된 숫자도 경계가 됩니다. |
| `under2camel` | [strToPascalCase](/ko/reference/string/strToPascalCase) | boltons는 첫 조각도 대문자로 만들므로 사실상 파스칼 표기입니다. 첫 단어를 소문자로 두려면 [strToCamelCase](/ko/reference/string/strToCamelCase)를 쓰세요. |
| `slugify` | [getSlug](/ko/reference/web/getSlug) | **다릅니다.** boltons는 기본 구분자가 `_`이고 qsu는 `-`입니다. qsu는 비라틴 문자를 유지하고, 특수문자를 퍼센트 인코딩할 수 있으며, `baseUrl`로 전체 URL을 만들 수 있습니다. |
| `bytes2human` | [fileSizeFormat](/ko/reference/format/fileSizeFormat) | **다릅니다.** boltons는 `126K`로 쓰고 qsu는 `125.97 KB`로 씁니다. qsu는 IEC나 SI 단위, 단위 전체 이름으로 바꿀 수 있습니다. |
| `asciify` | [deburr](/ko/reference/string/deburr) | **다릅니다.** `asciify`는 바이트를 돌려주고 옮길 수 없는 문자는 버립니다. `deburr`는 문자열을 돌려주고 라틴 문자의 발음 구별 기호만 없앱니다. |
| `ellipsize` | [truncate](/ko/reference/string/truncate) | **다릅니다.** `ellipsize`는 단어 경계에서 자르고 기본으로 `…`를 붙입니다. qsu는 길이에서 자르고 말하지 않으면 아무것도 붙이지 않습니다. 문장 끝에서 자르려면 [truncateExpect](/ko/reference/string/truncateExpect)가 있습니다. |
| `is_ascii` | — | [strToAscii](/ko/reference/string/strToAscii)는 변환할 뿐 판정하지 않습니다. |
| `html2text` | — | [unescapeHtml](/ko/reference/web/unescapeHtml)은 엔티티를 되돌릴 뿐 태그는 그대로 둡니다. |
| `indent`, `strip_ansi`, `ordinalize`, `pluralize`, `singularize`, `cardinalize`, `a10n`, `find_hashtags`, `multi_replace`, `unwrap_text`, `parse_int_list`, `format_int_list`, `args2cmd`, `gzip_bytes` | — | 대응되는 것이 없습니다. |
| — | 다섯 가지 표기 변환, [pad](/ko/reference/string/pad), [trim](/ko/reference/string/trim), [words](/ko/reference/string/words), [strCount](/ko/reference/string/strCount), [strRandom](/ko/reference/string/strRandom), [removeSpecialChar](/ko/reference/string/removeSpecialChar), [replaceBetween](/ko/reference/string/replaceBetween), [escapeRegExp](/ko/reference/string/escapeRegExp), [getStrBytes](/ko/reference/string/getStrBytes) | boltons에 대응되는 것이 없습니다. |

## iterutils

| boltons | qsu | 비고 |
| --- | --- | --- |
| `chunked` | [arrGroupByMaxCount](/ko/reference/array/arrGroupByMaxCount) | **다릅니다.** qsu는 마지막 묶음을 채우지 않습니다. |
| `unique` | [arrUnique](/ko/reference/array/arrUnique) | **다릅니다.** qsu는 `key` 함수를 받지 않습니다. |
| `flatten` | [arrTo1dArray](/ko/reference/array/arrTo1dArray) | 둘 다 끝까지 폅니다. |
| `get_path` | [objGet](/ko/reference/object/objGet) | **다릅니다.** boltons는 단계를 튜플로 받고, qsu는 점 표기나 대괄호 표기의 문자열 하나를 받으며 예외 대신 `fallback`을 돌려줍니다. |
| `redundant` | [arrCount](/ko/reference/array/arrCount) | **다릅니다.** qsu는 중복된 값만이 아니라 모든 값의 개수를 돌려주고, 값은 문자열이나 숫자여야 합니다. |
| `same` | [isEqual](/ko/reference/verify/isEqual) | **다릅니다.** `isEqual(first, rest)`는 값 하나를 나머지와 비교합니다. |
| `backoff` | [retry](/ko/reference/misc/retry) | **다릅니다.** boltons는 대기 시간 목록을 돌려주고, qsu의 `retry`는 함수를 직접 실행하며 시도 사이에 기다립니다. |
| `remap`, `research` | — | [objFindItemRecursiveByKey](/ko/reference/object/objFindItemRecursiveByKey)와 `recursive`를 켠 [objUpdate](/ko/reference/object/objUpdate)가 일부를 덮을 뿐, `remap` 전체를 대신하는 것은 없습니다. boltons를 그대로 두세요. |
| `bucketize`, `partition`, `windowed`, `pairwise`, `first`, `one`, `split`, `strip`, `soft_sorted`, `frange`, `is_iterable`, `is_scalar`, `is_collection` | — | 대응되는 것이 없습니다. |
| — | [arrDifference](/ko/reference/array/arrDifference), [arrIntersection](/ko/reference/array/arrIntersection), [arrCompact](/ko/reference/array/arrCompact), [arrShuffle](/ko/reference/array/arrShuffle), [arrPick](/ko/reference/array/arrPick), [arrMove](/ko/reference/array/arrMove), [sortByObjectKey](/ko/reference/array/sortByObjectKey), [sortNumeric](/ko/reference/array/sortNumeric) | boltons에 대응되는 것이 없습니다. |

## fileutils와 mathutils, timeutils

| boltons | qsu | 비고 |
| --- | --- | --- |
| `fileutils.mkdir_p` | [createDirectory](/ko/reference/file/createDirectory) | 둘 다 이미 있는 디렉터리는 넘어갑니다. |
| `fileutils.atomic_save`, `AtomicSaver`, `atomic_rename`, `copytree`, `iter_find_files`, `rotate_file`, `FilePerms` | — | 대응되는 것이 없습니다. boltons를 쓰는 이유가 이쪽이고, qsu는 원자적 쓰기를 시도하지 않습니다. |
| `mathutils.clamp` | [clamp](/ko/reference/math/clamp) | **다릅니다.** qsu는 양쪽 경계를 모두 요구합니다. |
| `mathutils.ceil`, `floor` | [ceil](/ko/reference/math/ceil), [floor](/ko/reference/math/floor) | **다릅니다.** boltons는 주어진 목록의 값으로 맞추고, qsu는 소수점 자릿수로 반올림합니다. |
| `statsutils` | [average](/ko/reference/array/average) | **다릅니다.** `average`는 평균만 냅니다. 중앙값과 분산, 분위수는 `statsutils`를 그대로 쓰세요. |
| `timeutils.daterange` | [createDateListFromRange](/ko/reference/date/createDateListFromRange) | **다릅니다.** boltons는 `date` 객체를 내놓고 step을 받습니다. qsu는 범위의 모든 날짜를 `YYYY-MM-DD` 문자열로 돌려줍니다. |
| `timeutils.relative_time` | [duration](/ko/reference/format/duration) | **다릅니다.** `relative_time`은 지금과의 거리를 쓰고, `duration`은 밀리초로 받은 길이를 씁니다. |
| `timeutils.isoparse`, `strpdate`, `parse_timedelta`, `dt_to_timestamp` | — | 대응되는 것이 없습니다. |
| `urlutils` | [parseAddress](/ko/reference/net/parseAddress) | **다릅니다.** boltons는 고치고 다시 쓸 수 있는 URL 객체를 주고, `parseAddress`는 부분을 돌려주는 데서 끝납니다. |
| `cacheutils`, `dictutils`, `listutils`, `setutils`, `queueutils`, `tbutils`, `funcutils`, `ioutils`, `jsonutils`, `socketutils`, `typeutils` | — | 대응되는 것이 없습니다. 자료구조와 기반 도구이고, qsu에는 그런 것이 없습니다. |

## qsu가 더 주는 것

- 객체: [objClone](/ko/reference/object/objClone), [objMerge](/ko/reference/object/objMerge), [objPick](/ko/reference/object/objPick), [objTo1d](/ko/reference/object/objTo1d), [objToQueryString](/ko/reference/object/objToQueryString), [objInvert](/ko/reference/object/objInvert).
- 검증: [isEmail](/ko/reference/verify/isEmail), [isUrl](/ko/reference/verify/isUrl), [isValidDate](/ko/reference/date/isValidDate), [between](/ko/reference/verify/between), [hasBadWords](/ko/reference/verify/hasBadWords).
- 해시와 암호화: [sha256Hash](/ko/reference/crypto/sha256Hash), [md5Hash](/ko/reference/crypto/md5Hash), [encrypt](/ko/reference/crypto/encrypt), [encodeBase64](/ko/reference/crypto/encodeBase64), [objectId](/ko/reference/crypto/objectId).
- 시스템: [getCpu](/ko/reference/os/getCpu)부터 [getFreeDiskSize](/ko/reference/os/getFreeDiskSize)까지 [os](/ko/reference/os/getCpu) 카테고리 전체.
- 웹: [isMobile](/ko/reference/web/isMobile), [isBotAgent](/ko/reference/web/isBotAgent), [escapeHtml](/ko/reference/web/escapeHtml), [isMatchPathname](/ko/reference/web/isMatchPathname).
- 타이밍: [debounce](/ko/reference/misc/debounce), [throttle](/ko/reference/misc/throttle), [sleep](/ko/reference/misc/sleep).
- JavaScript와 Dart에서도 같은 함수.

## 예제

이전:

```python
from boltons.strutils import slugify, bytes2human
from boltons.iterutils import chunked, unique

slug = slugify(title, delim='-')
label = bytes2human(size, 2)
pages = chunked(unique(ids), 20)
```

이후:

```python
from qsu import getSlug, fileSizeFormat, arrGroupByMaxCount, arrUnique

slug = getSlug(title)
label = fileSizeFormat(size, 2)
pages = arrGroupByMaxCount(arrUnique(ids), 20)
```

두 라벨은 같은 문자열이 아닙니다. `bytes2human(128991, 2)`는 `125.97K`를, `fileSizeFormat(128991, 2)`는 `125.97 KB`를 냅니다. 출력을 파싱하는 코드가 있다면 확인해야 합니다.
