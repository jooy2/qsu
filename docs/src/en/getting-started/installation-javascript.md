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

### Using named import (Multiple utilities in a single require) - Recommend

```javascript
import { today, strCount } from 'qsu';

function main() {
	console.log(today()); // '20xx-xx-xx'
	console.log(strCount('123412341234', '1')); // 3
}
```

### Using whole class (multiple utilities simultaneously with one object)

```javascript
import _ from 'qsu';

function main() {
	console.log(_.today()); // '20xx-xx-xx'
}
```
