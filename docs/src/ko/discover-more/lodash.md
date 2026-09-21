---
order: 2
menuTitle: Lodash
description: JavaScript 프로젝트를 Lodash에서 qsu로 옮기는 방법을 함수 단위로 정리했습니다. 동작이 다른 짝도 함께 표시합니다.
---

# Lodash에서 qsu로 옮기기

Lodash와 qsu는 겹치는 부분이 있지만, qsu는 Lodash를 그대로 갈아 끼울 수 있는 대체재가 아닙니다. 이 문서는 qsu에 대응 함수가 있는 Lodash 함수를 정리하고, 이름만 비슷하고 동작이 다른 짝을 표시하며, 대응되는 것이 아예 없는 함수도 그대로 적어 둡니다.

아직 도입을 고민하는 단계라면 함수 목록 대신 두 라이브러리의 성격을 다루는 [비교](./comparison)를 먼저 읽으세요.

## 시작하기 전에

qsu는 ESM 전용이고 Node 20 이상이 필요합니다. 패키지 루트에서 가져오거나, 가져오는 범위를 좁히고 싶다면 카테고리 서브패스를 쓰세요.

```javascript
import { strToCamelCase, arrUnique } from 'qsu';
import { trim } from 'qsu/string';
```

해시, 파일, 시스템 정보, `fetchData`는 Node 런타임이 필요하므로 `qsu/node`에서 가져옵니다.

```javascript
import { sha256Hash, getFileSize } from 'qsu/node';
```

체인 형태는 없습니다. `_.chain(x).map(f).uniq().value()`에 대응되는 것이 없고 `lodash/fp` 빌드도 마찬가지입니다. 함수를 하나씩 호출하고, `map`과 `filter`는 언어의 것을 쓰세요.

## 문자열

| Lodash | qsu | 비고 |
| --- | --- | --- |
| `camelCase` | [strToCamelCase](/ko/reference/string/strToCamelCase) |  |
| `kebabCase` | [strToKebabCase](/ko/reference/string/strToKebabCase) |  |
| `snakeCase` | [strToSnakeCase](/ko/reference/string/strToSnakeCase) |  |
| — | [strToPascalCase](/ko/reference/string/strToPascalCase) | Lodash에서는 `_.upperFirst(_.camelCase(s))`로 만듭니다. |
| — | [strToConstantCase](/ko/reference/string/strToConstantCase) | `_.upperCase`는 `FOO_BAR`가 아니라 `FOO BAR`를 냅니다. |
| `upperFirst` | [capitalizeFirst](/ko/reference/string/capitalizeFirst) |  |
| `lowerFirst` | [uncapitalizeFirst](/ko/reference/string/uncapitalizeFirst) |  |
| `capitalize` | [capitalizeFirst](/ko/reference/string/capitalizeFirst) | **다릅니다.** Lodash는 첫 글자 뒤를 모두 소문자로 바꾸고, qsu는 그대로 둡니다. |
| `startCase` | [capitalizeEachWords](/ko/reference/string/capitalizeEachWords) | **다릅니다.** Lodash는 문자열을 단어로 다시 나누고, qsu는 공백이 나눈 단어를 그대로 씁니다. `natural` 옵션을 주면 짧은 전치사는 소문자로 남습니다. |
| `deburr` | [deburr](/ko/reference/string/deburr) |  |
| `escape` | [escapeHtml](/ko/reference/web/escapeHtml) | 같은 다섯 글자를 처리합니다. |
| `unescape` | [unescapeHtml](/ko/reference/web/unescapeHtml) |  |
| `escapeRegExp` | [escapeRegExp](/ko/reference/string/escapeRegExp) |  |
| `pad` | [pad](/ko/reference/string/pad) | 세 방향을 함수 하나가 처리합니다. `padStart`는 `{ position: 'start' }`, `padEnd`는 `{ position: 'end' }`입니다. |
| `truncate` | [truncate](/ko/reference/string/truncate) | **다릅니다.** Lodash는 생략 기호를 `length` 안에 포함해 세고, qsu는 `length`까지 자른 뒤 생략 기호를 덧붙입니다. Lodash의 `separator`에 해당하는 것은 없지만, 문장 끝에서 자르려면 [truncateExpect](/ko/reference/string/truncateExpect)가 있습니다. |
| `trim` | [trim](/ko/reference/string/trim) | **다릅니다.** qsu는 문자열 안쪽의 연속된 공백도 하나로 줄이며, 제거할 문자를 지정받지 않습니다. |
| `words` | [words](/ko/reference/string/words) | qsu는 패턴 인자를 받지 않습니다. |
| `split` | [split](/ko/reference/string/split) | qsu는 구분자를 여러 개 한 번에 받습니다. 하나뿐이라면 언어의 `split`을 쓰세요. |
| `parseInt` | [safeParseInt](/ko/reference/format/safeParseInt) | `NaN` 대신 `fallback`을 돌려줍니다. |
| `repeat` | — | `'ab'.repeat(3)`을 쓰세요. |
| `toLower`, `toUpper`, `startsWith`, `endsWith`, `replace` | — | 언어에 이미 있습니다. |
| `template` | — | 대응되는 것이 없습니다. |

## 배열

| Lodash | qsu | 비고 |
| --- | --- | --- |
| `chunk` | [arrGroupByMaxCount](/ko/reference/array/arrGroupByMaxCount) |  |
| `compact` | [arrCompact](/ko/reference/array/arrCompact) | 세 패키지가 같은 답을 내도록, JavaScript의 truthy 판정 대신 제거할 값을 고정해 두었습니다. |
| `difference` | [arrDifference](/ko/reference/array/arrDifference) |  |
| `intersection` | [arrIntersection](/ko/reference/array/arrIntersection) |  |
| `uniq` | [arrUnique](/ko/reference/array/arrUnique) |  |
| `flattenDeep` | [arrTo1dArray](/ko/reference/array/arrTo1dArray) | 한 단계만 펴는 `_.flatten`은 `array.flat()`입니다. |
| `shuffle` | [arrShuffle](/ko/reference/array/arrShuffle) |  |
| `sample` | [arrPick](/ko/reference/array/arrPick) | `_.sampleSize`에 해당하는 것은 없습니다. |
| `countBy` | [arrCount](/ko/reference/array/arrCount) | **다릅니다.** iteratee가 없고, 값은 문자열이나 숫자여야 합니다. |
| `range` | [arrWithNumber](/ko/reference/array/arrWithNumber) | **다릅니다.** qsu는 끝 값을 포함하고 step을 받지 않습니다. |
| `fill` | [arrWithDefault](/ko/reference/array/arrWithDefault) | **다릅니다.** qsu는 기존 배열에 써 넣는 대신 주어진 길이의 새 배열을 만듭니다. |
| `sortBy` | [sortByObjectKey](/ko/reference/array/sortByObjectKey) | 객체 배열의 키 하나를 기준으로 정렬합니다. 키 여러 개나 iteratee는 지원하지 않습니다. |
| `mean` | [average](/ko/reference/array/average) |  |
| `without` | — | `arrDifference(array, [value])`로 씁니다. |
| `zip`, `unzip`, `take`, `drop`, `head`, `last`, `nth`, `pull`, `remove`, `orderBy`, `groupBy`, `keyBy`, `partition` | — | 대응되는 것이 없습니다. |
| — | [sortNumeric](/ko/reference/array/sortNumeric) | 문자열을 그 안의 숫자 기준으로 정렬합니다. |
| — | [arrMove](/ko/reference/array/arrMove), [arrRepeat](/ko/reference/array/arrRepeat), [is2dArray](/ko/reference/verify/is2dArray) | Lodash에 대응되는 것이 없습니다. |

## 객체

| Lodash | qsu | 비고 |
| --- | --- | --- |
| `cloneDeep` | [objClone](/ko/reference/object/objClone) | qsu는 기본이 깊은 복사입니다. |
| `clone` | [objClone](/ko/reference/object/objClone)에 `{ deep: false }` |  |
| `merge` | [objMerge](/ko/reference/object/objMerge) | **다릅니다.** Lodash는 배열을 인덱스별로 병합하지만 qsu는 통째로 교체합니다. |
| `defaults` | [objMerge](/ko/reference/object/objMerge) | **다릅니다.** `objMerge`는 뒤에 온 객체가 이기므로 인자를 바꿔서 `objMerge(fallback, obj)`로 씁니다. 중첩 객체까지 병합하는 점도 다릅니다. |
| — | [objMergeNewKey](/ko/reference/object/objMergeNewKey) | 양쪽에 모두 있는 배열을 어떻게 처리할지(유지·교체·이어 붙이기) 고를 수 있는 깊은 병합입니다. |
| `get` | [objGet](/ko/reference/object/objGet) | 점 표기와 대괄호 표기를 모두 받습니다. 기본값은 `{ fallback }`으로 넘깁니다. |
| `invert` | [objInvert](/ko/reference/object/objInvert) |  |
| `mapKeys` | [objMapKeys](/ko/reference/object/objMapKeys) |  |
| `pick` | [objPick](/ko/reference/object/objPick) | 최상위만 봅니다. |
| `pickBy` | [objPickBy](/ko/reference/object/objPickBy) | 최상위만 봅니다. |
| `omit`, `omitBy` | — | 조건을 뒤집어 `objPickBy`를 쓰세요. |
| `toPairs` | [objToArray](/ko/reference/object/objToArray) |  |
| `set`, `update` | [objUpdate](/ko/reference/object/objUpdate) | **다릅니다.** qsu는 경로를 따라가는 대신 키 이름을 찾고, 옵션으로 하위 항목까지 훑습니다. |
| `unset` | — | [objDeleteKeyByValue](/ko/reference/object/objDeleteKeyByValue)는 키가 아니라 값으로 지웁니다. |
| `keys`, `values`, `has`, `mapValues`, `forOwn` | — | 언어에 이미 있습니다. |
| — | [objTo1d](/ko/reference/object/objTo1d) | 중첩 객체를 점으로 이은 키 하나의 단계로 폅니다. |
| — | [objToQueryString](/ko/reference/object/objToQueryString), [objToPrettyStr](/ko/reference/object/objToPrettyStr), [objFindItemRecursiveByKey](/ko/reference/object/objFindItemRecursiveByKey) | Lodash에 대응되는 것이 없습니다. |

## 숫자

| Lodash | qsu | 비고 |
| --- | --- | --- |
| `add`, `subtract`, `multiply`, `divide` | [sum](/ko/reference/math/sum), [sub](/ko/reference/math/sub), [mul](/ko/reference/math/mul), [div](/ko/reference/math/div) | qsu는 인자를 몇 개든 받거나 배열 하나를 받습니다. |
| `sum` | [sum](/ko/reference/math/sum) |  |
| `max`, `min` | [max](/ko/reference/math/max), [min](/ko/reference/math/min) | 빈 입력에는 `undefined`가 아니라 <code>null</code>을 돌려줍니다. |
| `ceil`, `floor`, `round` | [ceil](/ko/reference/math/ceil), [floor](/ko/reference/math/floor), [round](/ko/reference/math/round) | **다릅니다.** qsu는 중간값을 0에서 먼 쪽으로 보냅니다. `round(-0.5)`는 `-1`이고 `_.round(-0.5)`는 `-0`입니다. |
| `clamp` | [clamp](/ko/reference/math/clamp) | 인자와 순서가 같습니다. |
| `inRange` | [between](/ko/reference/verify/between) | **다릅니다.** 범위를 쌍으로 먼저 받고, `inclusive`를 주지 않으면 양 끝을 제외합니다. |
| `random` | [numPick](/ko/reference/math/numPick) | **다릅니다.** 정수만 냅니다. |
| `uniqueId` | [numUnique](/ko/reference/math/numUnique) | **다릅니다.** 시계에서 만든 숫자이고 접두사 인자가 없습니다. |

## 함수와 타이밍

| Lodash | qsu | 비고 |
| --- | --- | --- |
| `debounce` | [debounce](/ko/reference/misc/debounce) |  |
| `throttle` | [throttle](/ko/reference/misc/throttle) |  |
| `times` | [funcTimes](/ko/reference/misc/funcTimes) |  |
| `delay` | — | [sleep](/ko/reference/misc/sleep)은 기다릴 뿐 호출을 예약하지 않습니다. |
| `memoize`, `once`, `curry`, `partial`, `flow`, `negate`, `wrap` | — | 대응되는 것이 없습니다. |
| — | [retry](/ko/reference/misc/retry) | 실패하면 다시 실행합니다. `times`, `delay`, `backoff`를 받습니다. |

## 타입과 값 검사

| Lodash | qsu | 비고 |
| --- | --- | --- |
| `isEmpty` | [isEmpty](/ko/reference/verify/isEmpty) |  |
| `isEqual` | [isEqual](/ko/reference/verify/isEqual), [isEqualStrict](/ko/reference/verify/isEqualStrict) | **다르고, 여기서 사고가 납니다.** Lodash는 객체를 깊게 비교합니다. qsu는 JavaScript와 같이 참조로 비교하므로 내용이 같은 두 객체는 같지 않습니다. `isEqual`은 타입을 무시하고 `isEqualStrict`는 무시하지 않습니다. |
| `isObject` | [isObject](/ko/reference/verify/isObject) | **다릅니다.** `_.isObject([])`는 <code>true</code>이지만 qsu는 배열에 <code>false</code>를 돌려줍니다. |
| `size` | [len](/ko/reference/verify/len) | 값이 없으면 `0`입니다. |
| `includes` | [contains](/ko/reference/verify/contains) | qsu는 후보 목록과 `exact` 옵션도 받습니다. |
| `isArray`, `isString`, `isNumber`, `isNil` 등 | — | 언어에 이미 있습니다. |

## qsu가 더 주는 것

Lodash가 다루지 않는 영역이고, Lodash를 대체하는 대신 옆에 qsu를 두는 이유이기도 합니다.

- 사람이 읽는 형식: [fileSizeFormat](/ko/reference/format/fileSizeFormat), [duration](/ko/reference/format/duration), [numberFormat](/ko/reference/format/numberFormat), 그리고 숫자와 단위를 따로 돌려주는 `Parts` 계열.
- 웹: [getSlug](/ko/reference/web/getSlug), [isBotAgent](/ko/reference/web/isBotAgent), [isMobile](/ko/reference/web/isMobile), [isMatchPathname](/ko/reference/web/isMatchPathname), [urlJoin](/ko/reference/string/urlJoin), [parseAddress](/ko/reference/net/parseAddress).
- 검증: [isEmail](/ko/reference/verify/isEmail), [isUrl](/ko/reference/verify/isUrl), [isValidDate](/ko/reference/date/isValidDate), [hasBadWords](/ko/reference/verify/hasBadWords).
- 해시와 암호화: [sha256Hash](/ko/reference/crypto/sha256Hash), [md5Hash](/ko/reference/crypto/md5Hash), [encrypt](/ko/reference/crypto/encrypt), [objectId](/ko/reference/crypto/objectId).
- 파일과 시스템: [file](/ko/reference/file/getFileInfo), [os](/ko/reference/os/getCpu) 카테고리 전체.
- Dart와 Python에서도 같은 함수.

## 예제

이전:

```javascript
import _ from 'lodash';

const slug = _.kebabCase(_.deburr(title));
const pages = _.chunk(_.uniq(ids), 20);
const config = _.merge({}, defaults, overrides);
const label = `${_.round(bytes / 1024 / 1024, 1)} MB`;
```

이후:

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

마지막 줄이 핵심입니다. 나누기 계산은 우회 방법이었고, [fileSizeFormat](/ko/reference/format/fileSizeFormat)은 단위를 알아서 고릅니다.

## 조금씩 옮기기

두 라이브러리는 한 프로젝트에 같이 둘 수 있습니다. 공유하는 전역 상태도, 프로토타입을 건드리는 부분도 없어서 떼어 놓을 이유가 없습니다.

문자열과 형식 관련 호출부터 바꾸는 편이 좋습니다. qsu가 가장 많이 덮는 영역이고, 동작 차이도 테스트에서 가장 빨리 드러납니다. `_.isEqual`과 `_.set`, 체인으로 엮인 코드는 마지막에 손대세요. 이름만 바꾸는 것이 아니라 호출 자체를 다시 써야 하는 것들입니다.
