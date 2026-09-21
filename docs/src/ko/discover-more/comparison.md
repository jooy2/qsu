---
order: 1
menuTitle: 비교
description: Lodash, Underscore.js, quiver, basic_utils, pydash, boltons와 qsu를 영역별로 비교합니다.
---

# 다른 유틸리티 라이브러리와의 비교

qsu는 세 언어 어디에서도 최초의 유틸리티 라이브러리가 아니고, 대부분의 프로젝트에서 유일한 라이브러리도 아닐 것입니다. 이 문서는 qsu가 무엇을 다루는지, 더 알려진 대안은 무엇을 다루는지, 어떤 일에 어느 쪽이 맞는지를 정리합니다.

사이드바에서 언어를 고르면 그 언어 기준으로 내용이 바뀝니다. 각 라이브러리에는 [마이그레이션 문서](/ko/discover-more/)도 따로 있습니다.

## 비교 대상

::: lang js

**[Lodash](https://lodash.com)**는 거의 모든 JavaScript 프로젝트가 한 번쯤 써 본 라이브러리입니다. 배열·객체·문자열을 중심으로 한 크고 안정적인 모음이며, 그 위에 커링, 체이닝, iteratee 축약 표기, `fp` 빌드 같은 함수형 계층이 얹혀 있습니다.

**[Underscore.js](https://underscorejs.org)**가 먼저 나왔고 규모는 더 작습니다. Lodash가 Underscore를 포크해 시작했기 때문에 이름 대부분이 겹치며, Underscore는 이후 범위를 넓히지 않고 좁게 유지해 왔습니다.

:::

::: lang dart

**[quiver](https://pub.dev/packages/quiver)**는 Google이 Apache-2.0으로 배포합니다. 유틸리티 모음이라기보다 SDK를 보완하는 쪽에 가깝습니다. Python의 `itertools`를 닮은 이터러블, SDK에 없는 `BiMap`·`Multimap` 같은 컬렉션 타입, 캐시, 인자 검사, 주입 가능한 `Clock`을 제공합니다.

**[basic_utils](https://pub.dev/packages/basic_utils)**는 정적 메서드를 담은 `*Utils` 클래스의 모음입니다. `StringUtils`, `MathUtils`, `IterableUtils`, `EmailUtils`, `DomainUtils`, `HttpUtils`, `DnsUtils`가 있고, `X509Utils`·`PKCS12Utils`·`ASN1Utils`로 이루어진 인증서·암호 영역이 큰 비중을 차지합니다.

:::

::: lang python

**[pydash](https://pydash.readthedocs.io)**는 Lodash의 이식판입니다. 이름은 Lodash를 `snake_case`로 옮긴 것이고 인자도 Lodash를 따르며, 체이닝과 콜백 축약 표기까지 그대로 가져왔습니다.

**[boltons](https://boltons.readthedocs.io)**는 "표준 라이브러리와 같은 결"을 지향하는 순수 Python 모듈 모음입니다. `strutils`, `iterutils`, `fileutils`, `timeutils`, `cacheutils` 등 스무 개가 넘습니다. 표준 라이브러리에 있었어야 했는데 없는 부분을 채우는 성격이라 이름도 `stdlib` 관례를 따릅니다.

:::

## 기능 시트

각 행은 질문 하나이고, qsu와 그 옆의 두 라이브러리에 같은 질문을 던집니다. 시트는 언어 스위치를 따르므로 열은 지금 고른 생태계의 것이고, 한 생태계에서만 의미가 있는 질문(Dart의 인증서, Python의 원자적 쓰기)은 그 시트에만 나옵니다.

표시는 결론이 아니라 출발점입니다. 두 함수가 모두 체크를 받아도 인자나 기본값, 경계 동작은 다를 수 있습니다. 그 차이를 다루는 것이 마이그레이션 문서입니다.

<FeatureMatrix />

## qsu가 하지 않는 일

위 표는 qsu를 기준으로 그린 것이니, 반대 방향도 적어 둡니다.

qsu에는 체이닝도, 커링도, 콜백 축약 표기도 없습니다. 모든 함수는 따로 호출하고 실제 인자를 받습니다. 그래서 `_.chain`도, `fp` 빌드도, 문자열이나 객체로 쓰는 iteratee도 없습니다.

고차 함수 도구도 없습니다. `memoize`, `once`, `curry`, `partial`, 함수 합성에 해당하는 것이 하나도 없습니다. `debounce`와 `throttle`, `retry`가 있는 이유는 타이밍 문제를 풀기 때문이지, qsu가 함수를 감싸는 일을 하기 때문이 아닙니다.

언어가 이미 잘하는 일은 언어에 맡깁니다. 매핑, 필터링, 리듀스, 정렬, 자르기, 묶기, 이어 붙이기는 요즘 JavaScript와 Dart, Python에서 모두 한 번의 호출이므로 qsu는 다시 만들지 않습니다.

::: lang js

Lodash에는 qsu에 어떤 수준으로도 대응되지 않는 기능이 더 있습니다. `_.template`, 정렬된 배열의 삽입 위치를 찾는 함수들, `_.zip`과 `_.unzip`, 키와 방향을 여러 개 받는 `_.orderBy`, 그리고 원본을 바꾸는 `_.pull`·`_.remove`·`_.fill`입니다.

:::

::: lang dart

quiver의 컬렉션 타입에는 대응되는 것이 없습니다. `BiMap`, `Multimap`, `LruMap`, `TreeSet`이 필요하다면 그것이 quiver를 쓰는 이유이고, qsu가 대신할 수 있는 것은 없습니다. 시간에 의존하는 코드를 테스트하기 위한 주입 가능한 `Clock`도 마찬가지입니다.

basic_utils는 인증서 쪽으로 qsu보다 훨씬 멀리 갑니다. qsu는 해시하고 인코딩하고 암호화하지만, X.509나 PKCS12, ASN.1을 읽거나 쓰지는 않습니다.

:::

::: lang python

pydash에는 qsu가 빼 둔 함수형 계층이 통째로 있고, 컬렉션 API의 상당 부분은 `map`·`filter`·`itertools`가 이미 해 주는 일로 돌아옵니다. boltons는 `remap`과 `research`로 중첩 자료구조를, `atomic_save`로 원자적 파일 쓰기를, `OrderedMultiDict`와 `IndexedSet`으로 자료구조를 qsu보다 깊게 다룹니다.

:::

## API의 모양

qsu의 모든 함수는 `camelCase` 이름을 가진 평범한 함수입니다. 선택 인자는 마지막에 하나로 모여서, JavaScript에서는 객체, Dart에서는 named 파라미터, Python에서는 키워드 인자나 `dict` 하나로 전달됩니다. 같은 동작에 이름을 여러 개 두지 않습니다. [pad](/ko/reference/string/pad)는 함수 세 개로 나뉘는 대신 `position` 옵션을 받고, [objClone](/ko/reference/object/objClone)은 두 개로 나뉘는 대신 `deep`을 받습니다.

::: lang js

Lodash와 Underscore도 데이터를 먼저 받고 새 값을 돌려주므로, 호출의 모양 자체는 qsu와 같습니다. 다른 것은 그 위의 계층입니다. Lodash는 콜백 자리에 속성 이름이나 객체, 배열을 받고, `_.get`과 `_.set`은 문자열로 쓴 경로를 읽습니다. qsu는 콜백을 콜백으로만 받고, 경로를 읽는 것은 [objGet](/ko/reference/object/objGet)뿐입니다.

:::

::: lang dart

quiver와 basic_utils는 서로 모양이 다릅니다. quiver는 최상위 함수를 내보내므로 `isBlank(s)`는 qsu의 `trim(s)`과 같은 방식으로 읽힙니다. basic_utils는 모두 정적 메서드를 가진 클래스로 묶어서 같은 호출이 `StringUtils.isNullOrEmpty(s)`가 됩니다. qsu는 여기서 quiver 쪽입니다. 함수는 최상위에 있고 한 곳에서 가져옵니다.

이름은 일부러 Dart답지 않게 지었습니다. `toCamelCase`나 확장 메서드가 아니라 `strToCamelCase`인 이유는, Dart 패키지가 JavaScript·Python 패키지와 똑같이 읽혀야 하기 때문입니다.

:::

::: lang python

pydash는 내장 함수와 충돌하는 이름 뒤에 밑줄을 붙여서 `pydash.map_`, `pydash.filter_`, `pydash.sum_`으로 씁니다. boltons는 표준 라이브러리를 따라 그룹마다 모듈을 두므로 `from boltons.strutils import slugify`처럼 가져옵니다.

qsu는 둘 다 하지 않습니다. Python에서도 이름은 `camelCase`이고 패키지 루트에서 가져옵니다. Python다운 방식은 아니며, 세 언어의 API를 같게 유지하기 위해 치르는 값입니다.

:::

## 어디에서 돌아가는가

::: lang js

qsu는 ESM 전용이고 Node 20 이상이 필요합니다. 의존성이 없고 사이드 이펙트가 없다고 표시되어 있으며, 카테고리마다 서브패스가 있어서 `import { trim } from 'qsu/string'`은 그 카테고리만 가져옵니다. Node 런타임이 필요한 함수는 `qsu/node` 뒤에 있어서 브라우저용 절반은 브라우저용으로 남습니다. TypeScript 타입은 패키지에 함께 들어 있습니다.

Lodash가 배포하는 진입점은 `exports` 맵이 없는 CommonJS 파일 하나입니다. ESM 빌드는 `lodash-es`라는 별도 패키지이고, 번들에서 트리셰이킹이 되는지는 그 패키지를 쓰는지에 달려 있습니다. Underscore는 조건부 exports로 두 빌드를 한 패키지에서 내보냅니다. 둘 다 타입 선언을 직접 배포하지 않아 DefinitelyTyped에서 가져옵니다.

:::

::: lang dart

qsu는 Dart 3.5 이상이 필요하고 `path`, `crypto`, `unorm_dart`, `ffi`, `pointycastle`에 의존합니다. `os` 카테고리는 macOS와 Windows에서 `dart:ffi`로, Linux와 Android에서 `/proc`으로 운영 체제에 접근하므로 웹에서는 `UnsupportedError`를 던집니다. 나머지는 웹에서도 그대로 동작합니다.

quiver는 순수 Dart이고 의존성이 하나입니다. basic_utils도 순수 Dart이지만 HTTP 클라이언트와 암호 구현을 포함해 여러 의존성을 함께 가져옵니다. 인증서 쪽 기능이 그 위에 올라가 있습니다.

:::

::: lang python

qsu는 Python 3.8 이상이 필요하고 `cryptography`에 의존합니다. `crypto` 카테고리가 그 위에 올라가 있습니다.

pydash는 순수 Python이지만 3.10 이상을 요구하므로, 낮은 인터프리터에 묶여 있다면 먼저 확인해야 할 부분입니다. boltons는 의존성이 전혀 없는 순수 Python이고 지원 범위도 둘 중 가장 넓습니다.

:::

## qsu에만 있는 것

같은 이름의 같은 함수가 JavaScript와 Dart, Python에서 같은 결과를 냅니다. API는 Node로, 앱은 Flutter로, 데이터 작업은 Python으로 쓰는 서비스라면 제목을 슬러그로 바꾸고 파일 용량을 표시하고 이메일을 검증하고 값을 해시하는 일을 세 곳에서 같은 방식으로 할 수 있습니다. 언어를 오가는 개발자도 쓰던 도구를 그대로 씁니다.

이 문서의 어떤 라이브러리도 그것을 시도하지 않습니다. 시도할 자리가 없기 때문입니다. Lodash는 JavaScript이고 quiver는 Dart이며 boltons는 Python입니다. pydash가 Lodash의 이름을 옮겨 와서 가장 가깝지만, 이식은 닮음이지 보증이 아닙니다. 두 프로젝트는 따로 관리되고 서로의 동작에 책임지지 않습니다.

qsu에서 이 일관성은 구호가 아니라 테스트로 지킵니다. 테스트는 구현과 함께 이식되고, 한 패키지에만 있는 몇 안 되는 함수는 조용히 빠지는 대신 [문서에 표시](/ko/reference/)됩니다.

## 무엇을 쓸 것인가

Lodash, quiver, basic_utils, pydash, boltons는 각자 잘하는 일에 그대로 쓰면 됩니다. qsu와 충돌하지 않으며, qsu를 넣기 위해 무언가를 뺄 이유도 없습니다.

qsu는 여러 언어에서 하나의 API를 쓰고 싶을 때, qsu가 다루고 다른 라이브러리는 다루지 않는 것(파일 용량, 시간, 슬러그, 해시, 시스템 정보, 파일 처리)이 필요할 때, 또는 같은 헬퍼를 네 번째로 직접 쓰게 될 때 꺼내면 됩니다.

반대로 qsu에 없는 함수형 계층에 기대고 있거나, qsu가 제공하지 않는 컬렉션 타입 위에 코드가 올라가 있거나, 쓰는 헬퍼가 이미 언어의 표준 라이브러리에 있다면 지금 쓰는 것을 그대로 두세요.
