---
title: 설치 <span class="VPBadge tip menu-badge">JavaScript</span>
order: 1
---

# 설치 <Badge type="tip" text="JavaScript" />

Qsu는 `Node.js 18.x` 이상이 필요하며, 리포지토리는 **[NPM](https://npmjs.com)** 패키지 관리자에서 서비스됩니다.

Qsu는 **ESM 전용**입니다. 모듈을 로드하려면 `require` 대신 `import`를 사용해야 합니다. CommonJS에 사용할 수 있는 해결 방법이 있지만 최근 JavaScript 트렌드에 따라 ESM을 사용하는 것이 좋습니다.

Node.js 환경을 구성한 후 다음 명령을 실행하면 됩니다:

```bash
# via npm
$ npm install qsu

# via yarn
$ yarn add qsu

# via pnpm
$ pnpm install qsu
```

## 사용 방법

### 명명된 가져오기 사용(단일 요구 사항에 여러 유틸리티 사용) - 권장 사항

```javascript
import { today, strCount } from 'qsu';

function main() {
	console.log(today()); // '20xx-xx-xx'
	console.log(strCount('123412341234', '1')); // 3
}
```

### 전체 클래스 사용(하나의 객체에 여러 유틸리티를 동시에 사용)

```javascript
import _ from 'qsu';

function main() {
	console.log(_.today()); // '20xx-xx-xx'
}
```
