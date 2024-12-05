---
title: Installation <span class="VPBadge tip menu-badge">JavaScript</span>
order: 1
---

# Installation <Badge type="tip" text="JavaScript" />

Qsu requires `Node.js 18.x` or higher, and the repository is serviced through **[NPM](https://npmjs.com)**.

Qsu is **ESM-only**. You must use `import` instead of `require` to load the module. There are workarounds available for CommonJS, but we recommend using ESM based on recent JavaScript trends.

After configuring the node environment, you can simply run the following command.

```bash
# via npm
$ npm install qsu
$ npm install qsu-web # (Optional) When using the Add-on for Web

# via yarn
$ yarn add qsu
$ yarn add qsu-web # (Optional) When using the Add-on for Web

# via pnpm
$ pnpm install qsu
$ pnpm install qsu-web # (Optional) When using the Add-on for Web
```

## How to Use

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
import * as _ from 'qsu';

function main() {
	console.log(_.today()); // '20xx-xx-xx'
	console.log(_.strCount('123412341234', '1')); // 3
}
```
