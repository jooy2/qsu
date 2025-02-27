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

# via yarn
$ yarn add qsu

# via pnpm
$ pnpm install qsu
```

## How to Use

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
import * as _ from 'qsu';

function main() {
	console.log(_.today()); // '20xx-xx-xx'
	console.log(_.strCount('123412341234', '1')); // 3
}
```
