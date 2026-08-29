---
title: JavaScript
order: 1
---

# Installation for JavaScript <Lang js />

A few simple steps are required to install **qsu** in the JavaScript language.

First, **qsu** requires `Node.js 18.x` or later. For security and high compatibility, it is recommended to use the latest LTS version of Node.js.

**qsu** is **ESM only**. To load the module, you must use `import` instead of `require`. There is a workaround that can be used for CommonJS, but it is recommended to use ESM in line with recent JavaScript trends.

In addition, some functions use APIs supported by Node.js (e.g. `node:crypto`, `node:path`, `node:fs`). These functions may not work properly on the client side or cause module reference issues.

After configuring the Node.js environment, run the following command to install the library:

::: code-group

```bash [npm]
$ npm install qsu
```

```bash [pnpm]
$ pnpm install qsu
```

```bash [yarn]
$ yarn add qsu
```

:::

## How to use

Below is an example using `today` and `strCount` utility functions of `qsu`. You can simply import the `qsu` package to use it.

```javascript
import { today, strCount } from 'qsu';

function main() {
	console.log(today()); // '20xx-xx-xx'
	console.log(strCount('123412341234', '1')); // 3
}
```

Instead of the function name, you can use a delimiter such as an underscore (`_`) to call the function.

This is a good way to distinguish which function is a utility function being used by `qsu`, but it is not recommended. A bundler can still drop the functions you never touch while every access is a plain property (`_.today()`), but as soon as the name is looked up dynamically (`_[name]()`) or `_` is handed to something else, the whole library has to be kept. Therefore, you should choose the appropriate method depending on the size of the project.

```javascript
import * as _ from 'qsu';

function main() {
	console.log(_.today()); // '20xx-xx-xx'
	console.log(_.strCount('123412341234', '1')); // 3
}
```

Certain utility functions related to files, encryption, etc. are not available in the browser environment because they require **Node.js** modules. To use them, you can import them in the Node.js runtime environment (primarily on the server) as follows

```javascript
import { createFile, md5Hash } from 'qsu/node';

async function main() {
	console.log(md5Hash('abc'));

	await createFile('/home/user/Hello.txt');
}

main();
```

Functions that should use `qsu/node` are listed at the top of each document in the reference entry as follows:

<NodeRequired en />

## Importing a single category

The package is marked side-effect free, so a bundler keeps only the functions you import from `qsu` and drops the rest.

If you are not running a bundler at all — a script, a serverless function, a test — you can import a single category instead of the whole package, which loads only that category's modules:

```javascript
import { arrUnique } from 'qsu/array';
import { getSlug } from 'qsu/web';
import { md5Hash } from 'qsu/node/crypto';
```

Every category has a subpath of its own: `qsu/array`, `qsu/date`, `qsu/format`, `qsu/math`, `qsu/misc`, `qsu/object`, `qsu/string`, `qsu/verify`, `qsu/web`, and under the Node.js runtime `qsu/node/crypto`, `qsu/node/file`, `qsu/node/misc`, `qsu/node/net`, `qsu/node/os`.

For more information on all other supported functions, see the [Reference](/reference/index.md) documentation.
