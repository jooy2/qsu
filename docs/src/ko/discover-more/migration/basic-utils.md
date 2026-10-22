---
order: 4
menuTitle: basic_utils에서 qsu로
description: Dart 프로젝트를 basic_utils에서 qsu로 옮기는 방법과, 주의해야 할 동작 차이를 정리했습니다.
---

# basic_utils에서 qsu로 옮기기

basic_utils는 성격상 qsu와 가장 가까운 Dart 패키지입니다. 문자열, 숫자, 이터러블, 이메일 주소, 도메인을 다루는 완성된 헬퍼 모음입니다. 동시에 X.509와 PKCS12, ASN.1 위에 올린 인증서·암호 영역이 크게 붙어 있는데, 그쪽에는 대응되는 것이 전혀 없습니다.

그래서 이동은 대개 일부만 이뤄집니다. 문자열과 수학, 이터러블 헬퍼는 잘 대응되지만 인증서 작업과 DNS 조회, 색상 처리는 그렇지 않습니다. 전체 그림은 [비교](../comparison)에 있습니다.

## 시작하기 전에

basic_utils는 함수를 정적 메서드 클래스로 묶으므로 `StringUtils.capitalize(s)`처럼 씁니다. qsu는 최상위 함수를 하나의 import로 내보냅니다.

```dart
import 'package:qsu/qsu.dart';
```

그래서 이름이 이미 쓰고 있는 것과 부딪칠 수 있습니다. `split`, `contains`를 조심하세요. 한 파일에서 둘 다 필요하면 qsu를 prefix로 가져오면 됩니다.

선택 인자는 양쪽 다 named 파라미터이므로 호출의 그 부분은 바뀌지 않습니다.

## 문자열

| basic_utils | qsu | 비고 |
| --- | --- | --- |
| `StringUtils.capitalize` | [capitalizeFirst](/ko/reference/string/capitalizeFirst) | **다릅니다.** basic_utils는 앞뒤 공백을 자르고 첫 글자 뒤를 모두 소문자로 바꿉니다. qsu는 첫 글자만 바꾸고 나머지는 그대로 둡니다. |
| `StringUtils.capitalize`에 `allWords: true` | [capitalizeEachWord](/ko/reference/string/capitalizeEachWord) | qsu에는 짧은 전치사를 소문자로 남기는 `titleCase` 옵션도 있습니다. |
| `StringUtils.camelCaseToLowerUnderscore` | [strToSnakeCase](/ko/reference/string/strToSnakeCase) | qsu는 [words](/ko/reference/string/words)로 나누므로 공백과 하이픈도 구분자가 됩니다. |
| `StringUtils.camelCaseToUpperUnderscore` | [strToConstantCase](/ko/reference/string/strToConstantCase) |  |
| `StringUtils.toPascalCase` | [strToPascalCase](/ko/reference/string/strToPascalCase) | [strToCamelCase](/ko/reference/string/strToCamelCase)와 [strToKebabCase](/ko/reference/string/strToKebabCase)도 있습니다. |
| `StringUtils.truncate` | [truncate](/ko/reference/string/truncate) | **다릅니다.** 뒤에 붙는 기호가 basic_utils에서는 `...`이고 qsu에서는 없습니다. 기존 출력을 유지하려면 `ellipsis: '...'`를 넘기세요. |
| `StringUtils.countChars` | [strCount](/ko/reference/string/strCount) | **다릅니다.** qsu는 길이에 상관없이 부분 문자열을 세고, 항상 대소문자를 구분합니다. |
| `StringUtils.inList` | [contains](/ko/reference/verify/contains) | **다릅니다.** 목록이 먼저 옵니다. `contains(list, s)`로 쓰며, 대소문자를 무시하는 형태는 없습니다. |
| `StringUtils.isNullOrEmpty` | [isEmpty](/ko/reference/verify/isEmpty) | qsu 쪽은 `String` 말고 어떤 값이든 받습니다. |
| `StringUtils.generateRandomString` | [strRandom](/ko/reference/string/strRandom) | **다릅니다.** qsu는 영문 소문자와 숫자에서 뽑고, `additionalCharacters`로 문자를 더할 수는 있지만 뺄 수는 없습니다. basic_utils는 영문자, 숫자, 특수 문자, 대소문자를 각각 켜고 끄거나 `from`으로 넘긴 문자에서 뽑습니다. |
| `StringUtils.hidePartial` | [strMaskRandom](/ko/reference/string/strMaskRandom) | **다릅니다.** basic_utils는 지정한 구간을 가리고, qsu는 무작위 위치를 가립니다. |
| `StringUtils.equalsIgnoreCase`, `isAscii`, `isDigit`, `isLowerCase`, `isUpperCase`, `isPalindrome`, `reverse`, `chunk`, `addCharAtPosition`, `removeCharAtPosition`, `removeExp`, `pickOnly`, `defaultString` | — | 대응되는 것이 없습니다. |
| — | [deburr](/ko/reference/string/deburr), [pad](/ko/reference/string/pad), [collapseWhitespace](/ko/reference/string/collapseWhitespace), [words](/ko/reference/string/words), [removeSpecialChars](/ko/reference/string/removeSpecialChars), [removeNewlines](/ko/reference/string/removeNewlines), [replaceEnclosed](/ko/reference/string/replaceEnclosed), [strByteLength](/ko/reference/string/strByteLength), [escapeRegExp](/ko/reference/string/escapeRegExp) | basic_utils에 대응되는 것이 없습니다. |

## 이터러블

| basic_utils | qsu | 비고 |
| --- | --- | --- |
| `IterableUtils.chunk` | [arrChunk](/ko/reference/array/arrChunk) |  |
| `IterableUtils.intersection` | [arrIntersection](/ko/reference/array/arrIntersection) | qsu는 리스트를 몇 개든 받습니다. |
| `IterableUtils.subtract` | [arrDifference](/ko/reference/array/arrDifference) | qsu는 리스트를 몇 개든 받습니다. |
| `IterableUtils.randomItem` | [arrRandom](/ko/reference/array/arrRandom) |  |
| `IterableUtils.containsAny` | [contains](/ko/reference/verify/contains) | `contains(list, others)`는 하나라도 있으면 참입니다. |
| `IterableUtils.size` | [len](/ko/reference/verify/len) |  |
| `IterableUtils.isNullOrEmpty` | [isEmpty](/ko/reference/verify/isEmpty) |  |
| `IterableUtils.union` | — | `arrUnique([...a, ...b])`로 씁니다. |
| `IterableUtils.containsAll`, `permutate`, `swap`, `zip`, `emptyIfNull` | — | 대응되는 것이 없습니다. |
| — | [arrUnique](/ko/reference/array/arrUnique), [arrShuffle](/ko/reference/array/arrShuffle), [arrCompact](/ko/reference/array/arrCompact), [arrMove](/ko/reference/array/arrMove), [arrFlatten](/ko/reference/array/arrFlatten), [sortByObjectKey](/ko/reference/array/sortByObjectKey), [sortNatural](/ko/reference/array/sortNatural) | basic_utils에 대응되는 것이 없습니다. |

## 숫자

| basic_utils | qsu | 비고 |
| --- | --- | --- |
| `MathUtils.round` | [numRound](/ko/reference/math/numRound) | 같은 인자를 받는 [ceil](/ko/reference/math/ceil)과 [floor](/ko/reference/math/floor)도 있고, 중간값은 0에서 먼 쪽으로 갑니다. |
| `MathUtils.mean` | [average](/ko/reference/array/average) |  |
| `MathUtils.getRandomNumber` | [numRandom](/ko/reference/math/numRandom) | **다릅니다.** `min`과 `max`가 위치 인자이고 둘 다 필수입니다. |
| `MathUtils.median` | [median](/ko/reference/array/median) | qsu는 `NaN`을 건너뛰고, 빈 리스트에는 <code>null</code>을 돌려줍니다. |
| `MathUtils.log10`, `log2`, `logBase`, 도형과 단위 변환 | — | 대응되는 것이 없습니다. |
| — | [numSum](/ko/reference/math/numSum), [sub](/ko/reference/math/sub), [mul](/ko/reference/math/mul), [div](/ko/reference/math/div), [clamp](/ko/reference/math/clamp), [numMax](/ko/reference/math/numMax), [numMin](/ko/reference/math/numMin), [numUniqueId](/ko/reference/math/numUniqueId) | basic_utils에 대응되는 것이 없습니다. |

## 주소와 날짜, 그 밖

| basic_utils | qsu | 비고 |
| --- | --- | --- |
| `EmailUtils` | [isEmail](/ko/reference/verify/isEmail) | **다릅니다.** qsu는 맞는지 아닌지만 답하고 주소를 분해하지 않습니다. |
| `DomainUtils` | [parseAddress](/ko/reference/net/parseAddress) | **다릅니다.** `parseAddress`는 IPv4와 IPv6, SSH 형식까지 포함해 주소 전체를 부분으로 나눕니다. 공개 접미사 목록이 없어서 서브도메인과 도메인을 구분하지는 못합니다. |
| `HttpUtils` | [fetchData](/ko/reference/net/fetchData) | qsu 쪽은 예외를 던지는 대신 상태 코드와 무관하게 본문을 돌려줍니다. |
| `CryptoUtils.getHash` | [sha256Hash](/ko/reference/crypto/sha256Hash) 등 해시 | **다릅니다.** qsu는 바이트 리스트가 아니라 문자열을 해시합니다. |
| `DateUtils` | — | 두 메서드 모두 대응되는 것이 없습니다. qsu의 [date](/ko/reference/date/today) 카테고리는 다른 일을 합니다. [today](/ko/reference/date/today), [dateToYYYYMMDD](/ko/reference/date/dateToYYYYMMDD), [dayDiff](/ko/reference/date/dayDiff), [isValidDate](/ko/reference/date/isValidDate), [createDateListFromRange](/ko/reference/date/createDateListFromRange), [isLeapYear](/ko/reference/date/isLeapYear), [getDaysInMonth](/ko/reference/date/getDaysInMonth)가 있습니다. |
| `X509Utils`, `PKCS12Utils`, `ASN1Utils`, `HexUtils`, `DnsUtils`, `ColorUtils`, `EnumUtils`, `BooleanUtils`, `SortUtils` | — | 대응되는 것이 없습니다. 이 영역은 basic_utils를 그대로 두세요. |

## qsu가 더 주는 것

- 사람이 읽는 형식: [fileSizeFormat](/ko/reference/format/fileSizeFormat), [duration](/ko/reference/format/duration), [numberFormat](/ko/reference/format/numberFormat), [safeParseJson](/ko/reference/format/safeParseJson).
- 객체: [objClone](/ko/reference/object/objClone), [objMerge](/ko/reference/object/objMerge), [objGet](/ko/reference/object/objGet), [objFlatten](/ko/reference/object/objFlatten), [objToQueryString](/ko/reference/object/objToQueryString)을 비롯한 [object](/ko/reference/object/objClone) 카테고리 전체.
- 웹: [getSlug](/ko/reference/web/getSlug), [escapeHtml](/ko/reference/web/escapeHtml), [isMobileDeviceFromUa](/ko/reference/web/isMobileDeviceFromUa), [isBot](/ko/reference/web/isBot), [isPathnameMatch](/ko/reference/web/isPathnameMatch).
- 파일과 시스템 정보: [file](/ko/reference/file/getFileInfo), [os](/ko/reference/os/getCpuModel) 카테고리.
- 타이밍: [debounce](/ko/reference/misc/debounce), [throttle](/ko/reference/misc/throttle), [retry](/ko/reference/misc/retry), [sleep](/ko/reference/misc/sleep).
- JavaScript와 Python에서도 같은 함수.

## 예제

이전:

```dart
import 'package:basic_utils/basic_utils.dart';

final title = StringUtils.capitalize(raw);
final short = StringUtils.truncate(title, 40);
final batches = IterableUtils.chunk(ids, 20);
final rounded = MathUtils.round(ratio, 2);
```

이후:

```dart
import 'package:qsu/qsu.dart';

final title = capitalizeFirst(collapseWhitespace(raw));
final short = truncate(title, 40, ellipsis: '...');
final batches = arrChunk(ids, 20);
final rounded = numRound(ratio, 2);
```

두 줄은 설명이 필요합니다. `capitalize`는 앞뒤 공백을 자르고 뒷부분을 소문자로 바꾸므로 여기서는 `collapseWhitespace`를 직접 쓰고 뒷부분의 대소문자는 그대로 둡니다. `truncate`는 기본으로 아무것도 붙이지 않으므로 무엇을 붙일지 알려 줘야 합니다.
