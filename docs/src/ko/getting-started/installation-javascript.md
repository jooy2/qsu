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

일반적으로 각각의 함수를 아래와 같이 부분적으로 import하여 사용할 수 있습니다.

```javascript
import { today, strCount } from 'qsu';

function main() {
	console.log(today()); // '20xx-xx-xx'
	console.log(strCount('123412341234', '1')); // 3
}
```

코드와 모듈의 구분을 위해 아래처럼 언더스코어(`_`)기호 등을 사용하여 메소드를 사용할 수 있습니다. 특별한 경우가 아니면 부분 가져오기를 사용하는 것을 권장합니다.

```javascript
import _ from 'qsu';

function main() {
	console.log(_.today()); // '20xx-xx-xx'
}
```

## 추가 애드온 사용하기

더 많은 기능의 유틸리티가 추가 애드온 모듈을 통해 지원됩니다. `qsu`의 패밀리 패키지를 설치할 수 있습니다.

각 패키지는 독립적이므로 `qsu` 패키지가 반드시 필요하지 않습니다. 필요에 따라 아래 커맨드로 모듈을 추가하세요.

현재 이 추가 모듈은 JavaScript 언어에서만 지원됩니다.

```bash
# via npm
$ npm install qsu-fs
$ npm install qsu-web

# via yarn
$ yarn add qsu-fs
$ yarn add qsu-web

# via pnpm
$ pnpm install qsu-fs
$ pnpm install qsu-web
```

- `qsu-fs`: 파일 처리에 대한 향상된 기능이 포함된 유틸리티 ([API](/ko/api/file.md))
- `qsu-web`: 웹페이지 또는 웹 서버에 도움이 되는 기능이 포함된 유틸리티 ([API문서](/ko/api/web.md))
