---
title: JavaScript <span class="VPBadge tip menu-badge">JavaScript</span>
order: 1
---

# JavaScript에서 설치 <Badge type="tip" text="JavaScript" />

JavaScript 언어로 **qsu**를 설치하기 위해 몇가지 간단한 절차가 필요합니다.

먼저 **qsu**는 `Node.js 18.x` 이상을 요구합니다. 안전하고 높은 호환성을 위해 가능한 Node.js 버전은 최신 LTS 버전을 사용하는 것을 권장합니다.

**qsu**는 **ESM 전용**입니다. 모듈을 로드하려면 `require` 대신 `import`를 사용해야 합니다. CommonJS에 사용할 수 있는 해결 방법이 있지만 최근 JavaScript 트렌드에 따라 ESM을 사용하는 것이 좋습니다.

또한 일부 함수는 Node.js에서 지원하는 API를 사용합니다. (예: `node:crypto`, `node:path`, `node:fs`) 이러한 함수는 클라이언트 사이드에서 올바르게 동작하지 않거나 모듈 참조 문제가 발생할 수 있습니다.

Node.js 환경을 구성한 후 다음 명령을 실행하여 라이브러리를 설치합니다:

```bash
# via npm
$ npm install qsu

# via yarn
$ yarn add qsu

# via pnpm
$ pnpm install qsu
```

## 사용 방법

아래는 `qsu`의 `today`와 `strCount` 유틸리티 함수를 사용한 예시입니다. 간단히 `qsu` 패키지를 import하여 사용할 수 있습니다.

```javascript
import { today, strCount } from 'qsu';

function main() {
	console.log(today()); // '20xx-xx-xx'
	console.log(strCount('123412341234', '1')); // 3
}
```

함수 이름 대신 언더스코어(`_`) 기호와 같이 구분자를 사용하여 함수를 불러올 수 있습니다.

이렇게 하면 어떤 함수가 `qsu`에서 사용 중인 유틸리티 함수인지 구분하기에는 좋지만, 모든 함수를 한번에 로드하므로 트리셰이킹을 통한 용량 축소가 불가능하므로 권장되는 사용 방법은 아닙니다. 따라서 프로젝트의 규모에 따라 적절한 방법을 선택해야 합니다.

```javascript
import _ from 'qsu';

function main() {
	console.log(_.today()); // '20xx-xx-xx'
	console.log(_.strCount('123412341234', '1')); // 3
}
```

지원하는 함수에 대해 자세히 알아보려면 [Reference](/ko/reference/index.md) 설명서를 참조하세요.
