---
order: 3
menuTitle: Underscore.js
description: JavaScript 프로젝트를 Underscore.js에서 qsu로 옮기는 방법과, 주의해야 할 동작 차이를 정리했습니다.
---

# Underscore.js에서 qsu로 옮기기

Underscore는 qsu와 비교되는 두 라이브러리 중 작은 쪽이고, 겹치는 부분도 그만큼 적습니다. Underscore가 잘하는 것은 `each`, `map`, `reduce`, `groupBy`, `pluck` 같은 컬렉션 작업인데, 그 대부분은 이제 언어에 들어 있습니다. qsu는 그 영역을 시도하지 않습니다.

그러고 나면 남는 목록이 짧아서 이 문서도 짧습니다. 두 라이브러리가 공유하는 이름은 [Lodash](./lodash) 문서에서 더 자세히 다루며, 이름이 같은 함수라면 거기의 비고가 그대로 적용됩니다.

## 시작하기 전에

qsu는 ESM 전용이고 Node 20 이상이 필요합니다. 붙일 전역 객체가 없으므로 `_`도 `_.mixin`도 없습니다.

```javascript
import { arrUnique, strToKebabCase } from 'qsu';
```

`_.chain(…).value()`도, `_.iteratee` 축약 표기도, `_.template`도 없습니다. 해시와 파일, 시스템 정보, `fetchData`는 `qsu/node`에서 가져옵니다.

## 배열과 컬렉션

| Underscore | qsu | 비고 |
| --- | --- | --- |
| `compact` | [arrCompact](/ko/reference/array/arrCompact) | qsu는 falsy한 값 전부가 아니라 정해진 값만 제거합니다. |
| `chunk` | [arrGroupByMaxCount](/ko/reference/array/arrGroupByMaxCount) |  |
| `difference` | [arrDifference](/ko/reference/array/arrDifference) |  |
| `intersection` | [arrIntersection](/ko/reference/array/arrIntersection) |  |
| `uniq` | [arrUnique](/ko/reference/array/arrUnique) |  |
| `flatten` | [arrTo1dArray](/ko/reference/array/arrTo1dArray) | 둘 다 끝까지 폅니다. qsu는 깊이 인자를 받지 않습니다. |
| `shuffle` | [arrShuffle](/ko/reference/array/arrShuffle) |  |
| `sample` | [arrPick](/ko/reference/array/arrPick) | qsu는 하나만 돌려주고 개수를 받지 않습니다. |
| `countBy` | [arrCount](/ko/reference/array/arrCount) | **다릅니다.** iteratee가 없고, 값은 문자열이나 숫자여야 합니다. |
| `range` | [arrWithNumber](/ko/reference/array/arrWithNumber) | **다릅니다.** qsu는 끝 값을 포함하고 step을 받지 않습니다. |
| `sortBy` | [sortByObjectKey](/ko/reference/array/sortByObjectKey) | 객체 배열의 키 하나가 기준입니다. iteratee는 지원하지 않습니다. |
| `size` | [len](/ko/reference/verify/len) | 어떤 값이든 받고, 값이 없으면 `0`입니다. |
| `contains` | [contains](/ko/reference/verify/contains) | **다릅니다.** qsu는 배열뿐 아니라 문자열도 받고, 두 번째 인자로 후보 목록을 받습니다. |
| `without` | — | `arrDifference(array, [value])`로 씁니다. |
| `union` | — | `arrUnique([...a, ...b])`로 씁니다. |
| `each`, `map`, `reduce`, `filter`, `find`, `every`, `some`, `pluck`, `groupBy`, `indexBy`, `partition`, `zip`, `first`, `last` | — | 언어에 이미 있습니다. |

## 객체

| Underscore | qsu | 비고 |
| --- | --- | --- |
| `clone` | [objClone](/ko/reference/object/objClone)에 `{ deep: false }` | Underscore의 `clone`은 얕은 복사이고, qsu는 따로 말하지 않으면 깊게 복사합니다. |
| `extend` | [objMerge](/ko/reference/object/objMerge) | **다릅니다.** `objMerge`는 중첩 객체까지 병합하고, 첫 인자에 써 넣는 대신 새 객체를 돌려줍니다. |
| `defaults` | [objMerge](/ko/reference/object/objMerge) | **다릅니다.** `objMerge`는 뒤에 온 객체가 이기므로 `objMerge(fallback, obj)`로 인자를 바꿔 씁니다. |
| `invert` | [objInvert](/ko/reference/object/objInvert) |  |
| `pick` | [objPick](/ko/reference/object/objPick), [objPickBy](/ko/reference/object/objPickBy) | `objPick`은 키를, `objPickBy`는 조건을 받습니다. |
| `pairs` | [objToArray](/ko/reference/object/objToArray) |  |
| `get` | [objGet](/ko/reference/object/objGet) | 점 표기와 대괄호 표기를 모두 받습니다. 기본값은 `{ fallback }`으로 넘깁니다. |
| `isEmpty` | [isEmpty](/ko/reference/verify/isEmpty) |  |
| `isEqual` | [isEqual](/ko/reference/verify/isEqual) | **다르고, 여기서 사고가 납니다.** Underscore는 객체를 깊게 비교하지만 qsu는 JavaScript와 같이 참조로 비교합니다. |
| `omit`, `mapObject`, `findKey`, `keys`, `values`, `has` | — | 대응되는 것이 없거나 언어에 이미 있습니다. |
| — | [objTo1d](/ko/reference/object/objTo1d), [objToQueryString](/ko/reference/object/objToQueryString), [objUpdate](/ko/reference/object/objUpdate) | Underscore에 대응되는 것이 없습니다. |

## 유틸리티

| Underscore | qsu | 비고 |
| --- | --- | --- |
| `escape` | [escapeHtml](/ko/reference/web/escapeHtml) | **다릅니다.** Underscore는 백틱도 변환하지만, qsu는 HTML에서 의미를 갖는 다섯 글자만 변환합니다. |
| `unescape` | [unescapeHtml](/ko/reference/web/unescapeHtml) |  |
| `times` | [funcTimes](/ko/reference/misc/funcTimes) |  |
| `random` | [numPick](/ko/reference/math/numPick) | 정수이고 양 끝을 포함합니다. |
| `uniqueId` | [numUnique](/ko/reference/math/numUnique) | **다릅니다.** 시계에서 만든 숫자이고 접두사 인자가 없습니다. |
| `max`, `min` | [max](/ko/reference/math/max), [min](/ko/reference/math/min) | qsu는 iteratee 대신 숫자들이나 숫자 배열 하나를 받습니다. |
| `debounce` | [debounce](/ko/reference/misc/debounce) |  |
| `throttle` | [throttle](/ko/reference/misc/throttle) |  |
| `delay`, `defer`, `memoize`, `once`, `partial`, `compose`, `bind`, `identity`, `constant`, `noop`, `template`, `now` | — | 대응되는 것이 없습니다. |

## qsu가 더 주는 것

Underscore가 처음부터 다루지 않은 영역이고, 그것이 qsu의 대부분입니다.

- 문자열: 다섯 가지 표기 변환([strToCamelCase](/ko/reference/string/strToCamelCase) 외 네 개), [deburr](/ko/reference/string/deburr), [pad](/ko/reference/string/pad), [truncate](/ko/reference/string/truncate), [trim](/ko/reference/string/trim), [words](/ko/reference/string/words), [escapeRegExp](/ko/reference/string/escapeRegExp).
- 사람이 읽는 형식: [fileSizeFormat](/ko/reference/format/fileSizeFormat), [duration](/ko/reference/format/duration), [numberFormat](/ko/reference/format/numberFormat).
- 웹과 검증: [getSlug](/ko/reference/web/getSlug), [isEmail](/ko/reference/verify/isEmail), [isUrl](/ko/reference/verify/isUrl), [isMobile](/ko/reference/web/isMobile), [parseAddress](/ko/reference/net/parseAddress).
- `qsu/node`의 해시, 파일, 시스템 정보.
- Dart와 Python에서도 같은 함수.

## 예제

이전:

```javascript
import _ from 'underscore';

const tags = _.uniq(_.compact(input.split(',')));
const pages = _.chunk(tags, 20);
const settings = _.defaults({}, given, fallback);
const safe = _.escape(comment);
```

이후:

```javascript
import { arrUnique, arrCompact, arrGroupByMaxCount, objMerge, escapeHtml } from 'qsu';

const tags = arrUnique(arrCompact(input.split(',')));
const pages = arrGroupByMaxCount(tags, 20);
const settings = objMerge(fallback, given);
const safe = escapeHtml(comment);
```

병합의 인자 순서가 뒤집힌 이유는 `objMerge`에서는 뒤에 온 객체가 이기고 `_.defaults`에서는 앞의 것이 이기기 때문입니다. 이스케이프 결과도 같지 않습니다. Underscore는 백틱을 `&#x60;`으로 바꾸고 qsu는 그대로 둡니다.
