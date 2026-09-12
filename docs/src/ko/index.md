---
layout: home

title: QSU
titleTemplate: 강력한 유틸리티 라이브러리

hero:
  name: QSU
  text: Quick & Simple Utility
  tagline: 프로젝트마다 직접 만들게 되는 유틸리티 함수를 모았습니다. slug, 대소문자 변환, 날짜 계산, 파일 크기, 깊은 복사와 병합, 검증, 해시를 JavaScript와 Dart, Python에서 같은 이름과 같은 동작으로 씁니다.
  actions:
    - theme: brand
      text: 시작하기
      link: ko/installation
    - theme: alt
      text: 레퍼런스
      link: ko/reference
    - theme: alt
      text: 소개
      link: ko/introduction
  image:
    src: /icon.png
    alt: qsu

features:
  - icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h14"/><path d="m14 5 3 3-3 3"/><path d="M21 16H7"/><path d="m10 13-3 3 3 3"/></svg>
    title: 하나의 API, 세 가지 언어
    details: 세 패키지가 같은 camelCase 이름과 같은 인자, 같은 결과를 씁니다. Node.js 서버와 Flutter 앱, Python 스크립트를 오가도 쓰던 함수를 다시 익힐 일이 없습니다.
    link: /ko/introduction
    linkText: qsu는 무엇인가
  - icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" fill="currentColor" opacity="0.25"/></svg>
    title: 13개 카테고리
    details: 배열과 객체, 문자열, 날짜, 수학, 포맷, 검증, 해시, 파일, 시스템, 웹까지 다룹니다. 함수마다 파라미터와 반환 타입, 예제를 담은 문서가 따로 있습니다.
    link: /ko/reference
    linkText: 레퍼런스 보기
  - icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4h-.5A3.5 3.5 0 0 0 5 7.5v2A2.5 2.5 0 0 1 2.5 12 2.5 2.5 0 0 1 5 14.5v2A3.5 3.5 0 0 0 8.5 20H9"/><path d="M15 4h.5A3.5 3.5 0 0 1 19 7.5v2a2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0-2.5 2.5v2a3.5 3.5 0 0 1-3.5 3.5H15"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/></svg>
    title: 모든 패키지에 타입이 있습니다
    details: npm 패키지는 TypeScript 선언을 함께 배포하고, Dart는 모든 시그니처에 타입을 적었습니다. Python 패키지는 py.typed로 표시해 mypy와 편집기가 그대로 읽습니다.
  - icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21V7"/><path d="m12 13 3.6-3.6"/><path d="M12 16 8.4 12.4" stroke-dasharray="2 2.6"/><circle cx="12" cy="5" r="2"/><circle cx="17" cy="8" r="2"/></svg>
    title: 가져다 쓴 것만 들어갑니다
    details: JavaScript 패키지는 ESM이고 런타임 의존성이 없으며 부수 효과가 없다고 표시합니다. 번들러가 호출한 함수만 남기고 나머지를 지웁니다. 카테고리마다 따로 가져오는 경로도 있습니다.
    link: /ko/installation
    linkText: 설치 방법
  - icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4.5 5.8v5.9c0 4.2 3.2 7.4 7.5 8.3 4.3-.9 7.5-4.1 7.5-8.3V5.8L12 3Z"/><path d="m9 12 2 2 4-4"/></svg>
    title: 모든 플랫폼에서 테스트합니다
    details: 패키지마다 Linux와 macOS, Windows에서 여러 런타임 버전으로 테스트를 돌립니다. 세 테스트는 서로를 옮겨 적은 것이라 같은 동작을 검사합니다.
  - icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7.2C10.6 5.8 8.6 5.2 4.5 5.2v12c4.1 0 6.1.6 7.5 2 1.4-1.4 3.4-2 7.5-2v-12c-4.1 0-6.1.6-7.5 2Z"/><path d="M12 7.2v12"/></svg>
    title: 문서는 영어와 한국어로
    details: 모든 레퍼런스 문서를 영어와 한국어로 씁니다. 고른 패키지에 맞춰 예제와 파라미터 설명, 타입 이름까지 바뀝니다.
    link: /ko/reference
    linkText: 레퍼런스 읽기
---

## 유틸리티 한 벌, 세 가지 언어

프로젝트마다 비슷한 유틸리티 폴더가 생기고, 언어를 옮기면 그 폴더를 처음부터 다시 만듭니다. qsu는 그 폴더를 한 번만 만들어 npm과 pub.dev, PyPI에 올려 둔 라이브러리입니다. 스택이 바뀌어도 쓰던 함수를 그대로 씁니다.

<div class="home-parity">

```javascript
// JavaScript / Node.js
import { getSlug } from 'qsu';

getSlug('Hello World!');
// 'hello-world'
```

```dart
// Dart / Flutter
import 'package:qsu/qsu.dart';

getSlug('Hello World!');
// 'hello-world'
```

```python
# Python
from qsu import getSlug

getSlug('Hello World!')
# 'hello-world'
```

</div>

<p class="home-note">이름도, 인자도, 결과도 같습니다.</p>

## 실제로 쓰는 모습

여기에서 언어를 고르면 아래 예제가 모두 그 언어로 바뀝니다. 레퍼런스의 모든 문서도 마찬가지입니다.

<LangTabs />

### 문자열과 slug, 대소문자

::: lang js

```javascript
import { getSlug, strToCamelCase, truncate } from 'qsu';

getSlug('Hello World'); // 'hello-world'
strToCamelCase('--foo-bar--'); // 'fooBar'
truncate('hello', 2, '...'); // 'he...'
```

:::

::: lang dart

```dart
import 'package:qsu/qsu.dart';

getSlug('Hello World'); // 'hello-world'
strToCamelCase('--foo-bar--'); // 'fooBar'
truncate('hello', 2, ellipsis: '...'); // 'he...'
```

:::

::: lang python

```python
from qsu import getSlug, strToCamelCase, truncate

getSlug('Hello World')  # 'hello-world'
strToCamelCase('--foo-bar--')  # 'fooBar'
truncate('hello', 2, '...')  # 'he...'
```

:::

### 날짜와 크기, 기간

::: lang js

```javascript
import { today, dayDiff, fileSizeFormat, duration } from 'qsu';

today(); // 'YYYY-MM-DD'
dayDiff(new Date('2021-01-01'), new Date('2021-01-03')); // 2
fileSizeFormat(100000000, 3); // '95.367 MB'
duration(604800000); // '7 Days'
```

:::

::: lang dart

```dart
import 'package:qsu/qsu.dart';

today(); // 'YYYY-MM-DD'
dayDiff(DateTime(2021, 1, 1), DateTime(2021, 1, 3)); // 2
fileSizeFormat(100000000, decimals: 3); // '95.367 MB'
duration(604800000); // '7 Days'
```

:::

::: lang python

```python
from datetime import datetime
from qsu import today, dayDiff, fileSizeFormat, duration

today()  # 'YYYY-MM-DD'
dayDiff(datetime(2021, 1, 1), datetime(2021, 1, 3))  # 2
fileSizeFormat(100000000, 3)  # '95.367 MB'
duration(604800000)  # '7 Days'
```

:::

### 배열과 객체, 검증

::: lang js

```javascript
import { arrUnique, objMerge, isEmail } from 'qsu';

arrUnique([1, 2, 2, 3]); // [1, 2, 3]
objMerge({ a: { b: 1 } }, { a: { c: 2 } }); // { a: { b: 1, c: 2 } }
isEmail('abc@def.com'); // true
```

:::

::: lang dart

```dart
import 'package:qsu/qsu.dart';

arrUnique([1, 2, 2, 3]); // [1, 2, 3]
objMerge([{'a': {'b': 1}}, {'a': {'c': 2}}]); // {'a': {'b': 1, 'c': 2}}
isEmail('abc@def.com'); // true
```

:::

::: lang python

```python
from qsu import arrUnique, objMerge, isEmail

arrUnique([1, 2, 2, 3])  # [1, 2, 3]
objMerge({'a': {'b': 1}}, {'a': {'c': 2}})  # {'a': {'b': 1, 'c': 2}}
isEmail('abc@def.com')  # True
```

:::

## 무엇이 들어 있나

카테고리는 13개이고, 아래 개수는 지금 읽고 있는 언어 기준입니다. 그 패키지에 없는 카테고리는 개수 대신 미지원이라고 적습니다.

<CategoryGrid :rows="[
	{ name: 'array', desc: '생성과 정렬, 추출, 중복 제거, 묶기.' },
	{ name: 'crypto', desc: '해시와 base64, 대칭 암호화, 아이디 생성.' },
	{ name: 'date', desc: '검증과 형식 변환, 기간 계산.' },
	{ name: 'file', desc: '파일과 디렉터리 조회, 경로 처리, 읽기와 쓰기.' },
	{ name: 'format', desc: '읽기 좋은 크기와 기간, 숫자. 예외를 던지지 않는 파싱.' },
	{ name: 'math', desc: '인자 목록이나 배열에 대한 사칙연산과 난수.' },
	{ name: 'misc', desc: 'debounce와 throttle, retry, sleep처럼 함수를 다루는 도구.' },
	{ name: 'net', desc: '네트워크 요청.' },
	{ name: 'object', desc: '탐색과 병합, 평탄화, 변환.' },
	{ name: 'os', desc: '프로세스가 도는 컴퓨터의 정보.' },
	{ name: 'string', desc: '변환과 대소문자, 공백 제거, 자르기.' },
	{ name: 'verify', desc: '타입과 동등성, 범위, 형식 검증.' },
	{ name: 'web', desc: 'URL과 slug, 사용자 에이전트처럼 브라우저에서 쓰는 도구.' }
]" />

## 언어를 골라 시작하기

필요한 패키지를 설치하세요. 여기에서 고른 언어로 설치 문서가 열리고, 그다음에 여는 문서도 같은 언어를 따릅니다.

<StartCards :cards="[
	{ id: 'js', note: 'Node.js 18 이상. ESM 전용이고, 런타임이 필요한 함수는 Node.js 전용 경로로 가져옵니다.', install: 'npm install qsu', link: '/ko/installation' },
	{ id: 'dart', note: 'Dart 3.5 이상. Flutter 3.24 이상이면 이미 들어 있습니다.', install: 'dart pub add qsu', link: '/ko/installation' },
	{ id: 'python', note: 'Python 3.8 이상. pip와 uv, Poetry, PDM으로 설치합니다.', install: 'pip install qsu', link: '/ko/installation' }
]" />

<div class="home-cta">

[소개](/ko/introduction) [레퍼런스](/ko/reference/index.md) [Changelog](/changelog/)

</div>
