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
$ npm install qsu-fs # (Optional) When using the Add-on for File
$ npm install qsu-web # (Optional) When using the Add-on for Web

# via yarn
$ yarn add qsu
$ yarn add qsu-fs # (Optional) When using the Add-on for File
$ yarn add qsu-web # (Optional) When using the Add-on for Web

# via pnpm
$ pnpm install qsu
$ pnpm install qsu-fs # (Optional) When using the Add-on for File
$ pnpm install qsu-web # (Optional) When using the Add-on for Web
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

## Using additional add-ons

More feature-rich utilities are supported through additional add-on modules. You can install family packages of `qsu`.

Each package is independent, so you don't necessarily need the `qsu` package. Add modules with the commands below as needed.

Currently, this additional module is only supported in the JavaScript language.

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

- `qsu-fs`: Utilities with enhancements for file processing ([API](/api/file.md))
- `qsu-web`: Utilities with features to help your webpage or web server ([API](/api/web.md))
