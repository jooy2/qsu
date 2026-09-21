---
order: 6
menuTitle: pydash
description: Python 프로젝트를 pydash에서 qsu로 옮기는 방법을 함수 단위로 정리했습니다. 동작이 다른 짝도 함께 표시합니다.
---

# pydash에서 qsu로 옮기기

pydash는 Lodash의 이식판이라 이름이 Lodash를 `snake_case`로 옮긴 것이고 인자도 Lodash를 따릅니다. qsu는 같은 전통에서 쓰인 자기 JavaScript 패키지의 이식판입니다. 그래서 겹치는 부분이 많고, 겹치지 않는 자리를 아는 편이 호출을 바꾸기 전에 도움이 됩니다.

pydash는 컬렉션과 함수 합성에서 qsu보다 넓고, 형식화와 해시, 파일, 시스템 정보에서는 좁습니다. 전체 그림은 [비교](./comparison)에 있습니다.

## 시작하기 전에

qsu는 Python 3.8 이상이 필요하므로 pydash가 이미 지원을 끊은 인터프리터에서도 돌아갑니다. 모든 함수는 패키지 루트에서 옵니다.

```python
from qsu import getSlug, arrUnique, fileSizeFormat
```

두 가지가 낯설 것입니다. 이름이 `camelCase`인 것은 의도한 것으로, Python 패키지가 JavaScript·Dart 패키지와 똑같이 읽혀야 하기 때문입니다. 그리고 `sum`, `max`, `min`, `round`가 실제 함수 이름이라서 이름으로 가져오면 내장 함수를 가립니다. pydash는 뒤에 밑줄을 붙여 이를 피하지만 qsu는 그러지 않으니, 문제가 되는 곳에서는 모듈을 가져와 쓰세요.

```python
import qsu

qsu.sum([1, 2, 3])
qsu.round(2.675, 2)
```

옵션은 키워드 인자로 받거나, 그 자리에 `dict` 하나로 받습니다.

## 문자열

| pydash | qsu | 비고 |
| --- | --- | --- |
| `camel_case` | [strToCamelCase](/ko/reference/string/strToCamelCase) |  |
| `kebab_case` | [strToKebabCase](/ko/reference/string/strToKebabCase) |  |
| `snake_case` | [strToSnakeCase](/ko/reference/string/strToSnakeCase) |  |
| `pascal_case` | [strToPascalCase](/ko/reference/string/strToPascalCase) |  |
| `separator_case` | [strToConstantCase](/ko/reference/string/strToConstantCase) | qsu는 구분자 인자 대신 정해진 한 가지 형태를 냅니다. |
| `upper_first` | [capitalizeFirst](/ko/reference/string/capitalizeFirst) |  |
| `lower_first` | [uncapitalizeFirst](/ko/reference/string/uncapitalizeFirst) |  |
| `capitalize` | [capitalizeFirst](/ko/reference/string/capitalizeFirst) | **다릅니다.** pydash는 기본적으로 첫 글자 뒤를 소문자로 바꾸고, qsu는 그대로 둡니다. |
| `start_case`, `title_case`, `human_case` | [capitalizeEachWords](/ko/reference/string/capitalizeEachWords) | **다릅니다.** qsu는 공백이 나눈 단어를 쓰고, `natural` 옵션으로 짧은 전치사를 소문자로 남깁니다. |
| `deburr` | [deburr](/ko/reference/string/deburr) |  |
| `escape`, `unescape` | [escapeHtml](/ko/reference/web/escapeHtml), [unescapeHtml](/ko/reference/web/unescapeHtml) | qsu는 `&`, `<`, `>`, `"`, `'`를 변환합니다. |
| `escape_reg_exp` | [escapeRegExp](/ko/reference/string/escapeRegExp) |  |
| `pad`, `pad_start`, `pad_end` | [pad](/ko/reference/string/pad) | `position` 옵션을 가진 함수 하나로 처리합니다. |
| `truncate` | [truncate](/ko/reference/string/truncate) | **다릅니다.** pydash는 생략 기호를 길이 안에 포함해 세고 기본값이 `...`입니다. qsu는 길이까지 자르고, 말하지 않으면 아무것도 붙이지 않습니다. |
| `trim` | [trim](/ko/reference/string/trim) | **다릅니다.** qsu는 문자열 안쪽의 연속된 공백도 하나로 줄이며, 제거할 문자를 지정받지 않습니다. |
| `words` | [words](/ko/reference/string/words) |  |
| `split` | [split](/ko/reference/string/split) | qsu는 구분자를 여러 개 한 번에 받습니다. |
| `count_substr` | [strCount](/ko/reference/string/strCount) |  |
| `slugify` | [getSlug](/ko/reference/web/getSlug) | **다릅니다.** qsu는 비라틴 문자를 기본으로 유지하고, 특수문자를 퍼센트 인코딩할 수 있으며, `baseUrl`로 전체 URL을 만들 수 있습니다. |
| `number_format` | [numberFormat](/ko/reference/format/numberFormat) | **다릅니다.** qsu는 천 단위를 쉼표로 끊는 것 외에는 받지 않습니다. |
| `repeat`, `join`, `lines`, `chars`, `quote`, `surround`, `strip_tags`, `prune`, `swap_case` | — | 대응되는 것이 없거나 언어에 이미 있습니다. |

## 리스트

| pydash | qsu | 비고 |
| --- | --- | --- |
| `chunk` | [arrGroupByMaxCount](/ko/reference/array/arrGroupByMaxCount) |  |
| `compact` | [arrCompact](/ko/reference/array/arrCompact) | **다릅니다.** 세 패키지가 같은 답을 내도록, falsy한 값 전부가 아니라 정해진 값만 제거합니다. |
| `difference` | [arrDifference](/ko/reference/array/arrDifference) |  |
| `intersection` | [arrIntersection](/ko/reference/array/arrIntersection) |  |
| `uniq` | [arrUnique](/ko/reference/array/arrUnique) |  |
| `flatten_deep` | [arrTo1dArray](/ko/reference/array/arrTo1dArray) | 한 단계만 펴는 `flatten`에 해당하는 것은 없습니다. |
| `shuffle` | [arrShuffle](/ko/reference/array/arrShuffle) |  |
| `sample` | [arrPick](/ko/reference/array/arrPick) | `sample_size`에 해당하는 것은 없습니다. |
| `count_by` | [arrCount](/ko/reference/array/arrCount) | **다릅니다.** iteratee가 없고, 값은 문자열이나 숫자여야 합니다. |
| `range_` | [arrWithNumber](/ko/reference/array/arrWithNumber) | **다릅니다.** qsu는 끝 값을 포함하고 step을 받지 않습니다. |
| `sort_by` | [sortByObjectKey](/ko/reference/array/sortByObjectKey) | dict 리스트의 키 하나가 기준입니다. |
| `mean` | [average](/ko/reference/array/average) |  |
| `size` | [len](/ko/reference/verify/len) |  |
| `without` | — | `arrDifference(items, [value])`로 씁니다. |
| `group_by`, `key_by`, `order_by`, `partition`, `zip_`, `take`, `drop`, `flat_map` | — | 대응되는 것이 없습니다. `itertools`와 컴프리헨션을 쓰세요. |
| — | [arrMove](/ko/reference/array/arrMove), [arrRepeat](/ko/reference/array/arrRepeat), [sortNumeric](/ko/reference/array/sortNumeric), [is2dArray](/ko/reference/verify/is2dArray) | pydash에 대응되는 것이 없습니다. |

## dict

| pydash | qsu | 비고 |
| --- | --- | --- |
| `clone_deep` | [objClone](/ko/reference/object/objClone) | qsu는 기본이 깊은 복사입니다. |
| `clone` | [objClone](/ko/reference/object/objClone)에 `deep=False` |  |
| `merge` | [objMerge](/ko/reference/object/objMerge) | **다릅니다.** qsu는 리스트를 인덱스별로 병합하지 않고 통째로 교체합니다. |
| `defaults` | [objMerge](/ko/reference/object/objMerge) | **다릅니다.** `objMerge`는 뒤에 온 dict가 이기므로 인자를 바꿔 쓰세요. |
| `get` | [objGet](/ko/reference/object/objGet) | 점 표기와 대괄호 표기를 모두 받습니다. 기본값은 `fallback`으로 넘깁니다. |
| `invert` | [objInvert](/ko/reference/object/objInvert) |  |
| `map_keys` | [objMapKeys](/ko/reference/object/objMapKeys) |  |
| `pick` | [objPick](/ko/reference/object/objPick) | 최상위만 봅니다. |
| `pick_by` | [objPickBy](/ko/reference/object/objPickBy) | 최상위만 봅니다. |
| `to_pairs` | [objToArray](/ko/reference/object/objToArray) |  |
| `set_`, `update` | [objUpdate](/ko/reference/object/objUpdate) | **다릅니다.** qsu는 경로를 따라가는 대신 키 이름을 찾고, 옵션으로 하위 항목까지 훑습니다. |
| `parse_int` | [safeParseInt](/ko/reference/format/safeParseInt) | 예외를 올리는 대신 fallback을 돌려줍니다. |
| `omit`, `omit_by`, `unset`, `map_values`, `rename_keys` | — | 조건을 뒤집어 `objPickBy`를 쓰거나 컴프리헨션으로 쓰세요. |
| — | [objTo1d](/ko/reference/object/objTo1d), [objToQueryString](/ko/reference/object/objToQueryString), [objToPrettyStr](/ko/reference/object/objToPrettyStr), [objFindItemRecursiveByKey](/ko/reference/object/objFindItemRecursiveByKey) | pydash에 대응되는 것이 없습니다. |

## 숫자와 검사, 타이밍

| pydash | qsu | 비고 |
| --- | --- | --- |
| `add`, `subtract`, `multiply`, `divide` | [sum](/ko/reference/math/sum), [sub](/ko/reference/math/sub), [mul](/ko/reference/math/mul), [div](/ko/reference/math/div) | qsu는 인자를 몇 개든 받거나 리스트 하나를 받습니다. |
| `sum_` | [sum](/ko/reference/math/sum) |  |
| `max_`, `min_` | [max](/ko/reference/math/max), [min](/ko/reference/math/min) | 빈 입력에는 <code>None</code>을 돌려줍니다. |
| `ceil`, `floor`, `round_` | [ceil](/ko/reference/math/ceil), [floor](/ko/reference/math/floor), [round](/ko/reference/math/round) | **다릅니다.** qsu는 중간값을 0에서 먼 쪽으로 보내므로 `round(0.5)`가 `1`입니다. Python의 내장 `round`는 `0`을 냅니다. |
| `clamp` | [clamp](/ko/reference/math/clamp) |  |
| `in_range` | [between](/ko/reference/verify/between) | **다릅니다.** 범위를 쌍으로 먼저 받고, `inclusive`를 주지 않으면 양 끝을 제외합니다. |
| `random` | [numPick](/ko/reference/math/numPick) | 정수만 냅니다. |
| `unique_id` | [numUnique](/ko/reference/math/numUnique) | **다릅니다.** 시계에서 만든 숫자이고 접두사 인자가 없습니다. |
| `median`, `variance`, `std_deviation`, `power`, `scale`, `transpose` | — | 대응되는 것이 없습니다. |
| `is_empty` | [isEmpty](/ko/reference/verify/isEmpty) |  |
| `is_equal` | [isEqual](/ko/reference/verify/isEqual), [isEqualStrict](/ko/reference/verify/isEqualStrict) | qsu는 Python의 `==`로 비교하므로 dict와 list는 내용으로 비교됩니다. `isEqual`은 타입을 무시하고 `isEqualStrict`는 무시하지 않습니다. |
| `is_dict` | [isObject](/ko/reference/verify/isObject) |  |
| `debounce`, `throttle` | [debounce](/ko/reference/misc/debounce), [throttle](/ko/reference/misc/throttle) |  |
| `times` | [funcTimes](/ko/reference/misc/funcTimes) |  |
| `retry` | [retry](/ko/reference/misc/retry) | **다릅니다.** pydash 쪽은 데코레이터를 만드는 함수이고, qsu 쪽은 함수를 받아 실행합니다. |
| `delay` | — | [sleep](/ko/reference/misc/sleep)은 기다릴 뿐 호출을 예약하지 않습니다. |
| `memoize`, `curry`, `once`, `partial`, `flow`, `iteratee` | — | 대응되는 것이 없습니다. |

## qsu가 더 주는 것

- 사람이 읽는 형식: [fileSizeFormat](/ko/reference/format/fileSizeFormat), [duration](/ko/reference/format/duration), 그리고 숫자와 단위를 따로 돌려주는 `Parts` 계열.
- 검증: [isEmail](/ko/reference/verify/isEmail), [isUrl](/ko/reference/verify/isUrl), [isValidDate](/ko/reference/date/isValidDate), [hasBadWords](/ko/reference/verify/hasBadWords).
- 해시와 암호화: [sha256Hash](/ko/reference/crypto/sha256Hash), [md5Hash](/ko/reference/crypto/md5Hash), [encrypt](/ko/reference/crypto/encrypt), [objectId](/ko/reference/crypto/objectId).
- 파일과 시스템: [file](/ko/reference/file/getFileInfo), [os](/ko/reference/os/getCpu) 카테고리.
- 웹: [isMobile](/ko/reference/web/isMobile), [isBotAgent](/ko/reference/web/isBotAgent), [isMatchPathname](/ko/reference/web/isMatchPathname), [parseAddress](/ko/reference/net/parseAddress), [urlJoin](/ko/reference/string/urlJoin).
- JavaScript와 Dart에서도 같은 함수.

## 예제

이전:

```python
import pydash as _

slug = _.slugify(title)
pages = _.chunk(_.uniq(ids), 20)
config = _.merge({}, defaults, overrides)
label = f'{_.round_(size / 1024 / 1024, 1)} MB'
```

이후:

```python
from qsu import getSlug, arrGroupByMaxCount, arrUnique, objMerge, fileSizeFormat

slug = getSlug(title)
pages = arrGroupByMaxCount(arrUnique(ids), 20)
config = objMerge(defaults, overrides)
label = fileSizeFormat(size, 1)
```

마지막 줄이 핵심입니다. 나누기 계산은 우회 방법이었고, [fileSizeFormat](/ko/reference/format/fileSizeFormat)은 단위를 알아서 고릅니다.
