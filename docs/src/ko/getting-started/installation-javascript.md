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
$ npm install qsu-web # (선택적) Web용 추가 유틸을 사용할 때

# via yarn
$ yarn add qsu
$ yarn add qsu-web # (선택적) Web용 추가 유틸을 사용할 때

# via pnpm
$ pnpm install qsu
$ pnpm install qsu-web # (선택적) Web용 추가 유틸을 사용할 때
```

## 사용 방법

In general, you can partially import and use each function as shown below.

```javascript
import { today, strCount } from 'qsu';

function main() {
	console.log(today()); // '20xx-xx-xx'
	console.log(strCount('123412341234', '1')); // 3
}
```

You can use methods with underscore (`_`) symbols to separate code and modules, as shown below. We recommend using partial imports unless there are special cases.

```javascript
import _ from 'qsu';

function main() {
	console.log(_.today()); // '20xx-xx-xx'
}
```
