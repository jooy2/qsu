---
order: 4
menuTitle: quiver
description: Dart 프로젝트에서 quiver 대신 qsu를 쓸 수 있는 부분과, quiver를 그대로 둬야 하는 부분을 정리했습니다.
---

# quiver에서 qsu로 옮기기

quiver와 qsu는 서로 다른 질문에 답합니다. quiver는 Dart SDK의 빈자리를 채웁니다. SDK에 없는 컬렉션 타입, Python `itertools`를 닮은 이터러블, 인자 검사, 캐시, 주입 가능한 시계가 거기 있습니다. qsu는 완성된 헬퍼를 모아 둔 도구 모음이고, 마침 세 언어로 쓰여 있습니다.

그래서 이 문서는 옮길 수 있는 것만큼 옮길 수 없는 것도 다룹니다. quiver를 쓰는 프로젝트라면 대개 quiver를 그대로 두고, quiver가 처음부터 다루지 않은 영역에 qsu를 더하는 편이 맞습니다. 전체 그림은 [비교](./comparison)에 있습니다.

## 시작하기 전에

qsu는 Dart 3.5 이상이 필요하고, 모든 함수는 하나의 import에서 옵니다.

```dart
import 'package:qsu/qsu.dart';
```

선택 인자는 Dart의 named 파라미터이므로 `truncate(text, 40, ellipsis: '…')`는 quiver 호출과 같은 방식으로 읽힙니다. 이름은 `camelCase`이고 일부러 Dart답지 않게 지었습니다. 확장 메서드가 아니라 `strToCamelCase`인 이유는 Dart 패키지가 JavaScript·Python 패키지와 똑같이 읽혀야 하기 때문입니다.

`os` 카테고리는 `dart:ffi`와 `/proc`으로 운영 체제에 접근하므로 웹에서는 `UnsupportedError`를 던집니다. 나머지는 웹에서도 동작합니다.

## 문자열

| quiver | qsu | 비고 |
| --- | --- | --- |
| `isEmpty` | [isEmpty](/ko/reference/verify/isEmpty) | qsu 쪽은 어떤 값이든 받습니다. null, `String`, `List`, `Map` 모두 됩니다. |
| `isBlank` | [trim](/ko/reference/string/trim) 뒤에 [isEmpty](/ko/reference/verify/isEmpty) | `isEmpty(trim(s))`로 씁니다. qsu에는 공백만 있는 문자열을 판정하는 함수가 따로 없습니다. |
| `isNotEmpty`, `isNotBlank` | — | 위 조건을 부정하세요. |
| `center` | [pad](/ko/reference/string/pad) | `pad`는 기본이 가운데 정렬이고, 남는 한 글자는 뒤에 붙입니다. |
| `equalsIgnoreCase`, `compareIgnoreCase` | — | 대응되는 것이 없습니다. 소문자로 바꿔 비교하세요. |
| `loop`, `isDigit`, `isWhitespace` | — | 대응되는 것이 없습니다. |

qsu의 문자열 카테고리는 quiver보다 훨씬 크고, 그중 어느 것도 quiver에 대응되지 않습니다. [words](/ko/reference/string/words) 위에 올린 다섯 가지 표기 변환, [deburr](/ko/reference/string/deburr), [truncate](/ko/reference/string/truncate), [removeSpecialChar](/ko/reference/string/removeSpecialChar), [strRandom](/ko/reference/string/strRandom), [getStrBytes](/ko/reference/string/getStrBytes) 같은 것들입니다.

## 이터러블

| quiver | qsu | 비고 |
| --- | --- | --- |
| `partition` | [arrGroupByMaxCount](/ko/reference/array/arrGroupByMaxCount) | 같은 개념입니다. 고정 크기로 묶고 마지막 묶음만 짧습니다. |
| `range` | [arrWithNumber](/ko/reference/array/arrWithNumber) | **다릅니다.** qsu는 끝 값을 포함하고 step을 받지 않습니다. |
| `max`, `min` | [max](/ko/reference/math/max), [min](/ko/reference/math/min) | **다릅니다.** qsu 쪽은 숫자 전용이고 `List<num>`을 받으며 비교 함수를 받지 않습니다. `dart:math`의 같은 이름을 가리므로, 둘 다 필요한 파일에서는 한쪽을 prefix로 가져와야 합니다. |
| `concat` | — | `expand`나 스프레드 연산자를 쓰세요. |
| `zip`, `cycle`, `enumerate`, `count`, `generate`, `extent`, `merge` | — | 대응되는 것이 없습니다. |
| — | [arrUnique](/ko/reference/array/arrUnique), [arrDifference](/ko/reference/array/arrDifference), [arrIntersection](/ko/reference/array/arrIntersection), [arrShuffle](/ko/reference/array/arrShuffle), [arrPick](/ko/reference/array/arrPick), [arrMove](/ko/reference/array/arrMove), [sortByObjectKey](/ko/reference/array/sortByObjectKey), [sortNumeric](/ko/reference/array/sortNumeric) | quiver에 대응되는 것이 없습니다. |

## 패턴과 검사

| quiver | qsu | 비고 |
| --- | --- | --- |
| `escapeRegex` | [escapeRegExp](/ko/reference/string/escapeRegExp) | 이름만 다르고 하는 일은 같습니다. |
| `Glob`, `matchAny`, `matchesFull` | — | [isMatchPathname](/ko/reference/web/isMatchPathname)은 URL 경로를 규칙과 맞춰 보는 함수라 글로브보다 좁습니다. |
| `quiver.check` | — | qsu의 [verify](/ko/reference/verify/isEmpty) 카테고리는 예외를 던지는 대신 불리언을 돌려주므로 인자 검사를 대신하지 못합니다. |

## 컬렉션, 캐시, 비동기, 시간

이 영역은 옮길 것이 없습니다.

`BiMap`, `Multimap`, `LruMap`, `TreeSet`, `Delegating*` 래퍼, `MapCache`는 자료구조이고 qsu에는 자료구조가 없습니다. `quiver.core`의 `Optional`과 `hash*` 헬퍼도 마찬가지입니다. [numberHash](/ko/reference/crypto/numberHash)는 문자열을 숫자로 해시하는 함수이지 `hashCode`를 만드는 도구가 아닙니다.

`listsEqual`, `mapsEqual`, `setsEqual`은 [isEqual](/ko/reference/verify/isEqual)처럼 보이지만 같지 않습니다. qsu의 `isEqual`은 Dart의 `==`로 비교하므로 내용이 같은 두 리스트는 같지 **않습니다**. quiver 쪽을 그대로 두세요.

`quiver.time`은 시간에 의존하는 코드를 주입 가능한 `Clock`으로 테스트하기 위해 있고, `quiver.testing`의 `FakeAsync`도 같은 이유로 있습니다. qsu의 [date](/ko/reference/date/today) 카테고리는 날짜를 형식화하고 비교할 뿐 시계를 제어하지 않습니다.

## qsu가 더 주는 것

- 사람이 읽는 형식: [fileSizeFormat](/ko/reference/format/fileSizeFormat), [duration](/ko/reference/format/duration), [numberFormat](/ko/reference/format/numberFormat).
- 객체: [objClone](/ko/reference/object/objClone), [objMerge](/ko/reference/object/objMerge), [objGet](/ko/reference/object/objGet), [objTo1d](/ko/reference/object/objTo1d), [objToQueryString](/ko/reference/object/objToQueryString).
- 검증과 웹: [isEmail](/ko/reference/verify/isEmail), [isUrl](/ko/reference/verify/isUrl), [getSlug](/ko/reference/web/getSlug), [escapeHtml](/ko/reference/web/escapeHtml), [parseAddress](/ko/reference/net/parseAddress).
- 해시와 암호화: [sha256Hash](/ko/reference/crypto/sha256Hash), [encrypt](/ko/reference/crypto/encrypt), [objectId](/ko/reference/crypto/objectId).
- 파일과 시스템 정보: [file](/ko/reference/file/getFileInfo), [os](/ko/reference/os/getCpu) 카테고리. 이런 성격의 순수 Dart 패키지 중에 이 영역을 다루는 것은 드뭅니다.
- 타이밍: [debounce](/ko/reference/misc/debounce), [throttle](/ko/reference/misc/throttle), [retry](/ko/reference/misc/retry), [sleep](/ko/reference/misc/sleep).
- JavaScript와 Python에서도 같은 함수.

## 예제

이전:

```dart
import 'package:quiver/iterables.dart';
import 'package:quiver/strings.dart';

final batches = partition(ids, 20).toList();
final label = isBlank(title) ? 'Untitled' : title;
final heading = center(label, 40, ' ');
```

이후:

```dart
import 'package:qsu/qsu.dart';

final batches = arrGroupByMaxCount(ids, 20);
final label = isEmpty(trim(title)) ? 'Untitled' : title;
final heading = pad(label, 40);
```

`partition`은 지연 평가되는 `Iterable`을 돌려주고 `arrGroupByMaxCount`는 `List`를 돌려주므로 `.toList()`는 빼야 합니다. 이 차이는 두 라이브러리 전체에 걸쳐 있습니다. quiver는 지연 이터러블 위에 있고, qsu는 완성된 값을 돌려줍니다.
