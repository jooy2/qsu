---
title: JavaScript
order: 1
---

# Installation for JavaScript <Badge type="tip" text="JavaScript" />

A few simple steps are required to install **qsu** in the JavaScript language.

First, **qsu** requires `Node.js 18.x` or later. For security and high compatibility, it is recommended to use the latest LTS version of Node.js.

**qsu** is **ESM only**. To load the module, you must use `import` instead of `require`. There is a workaround that can be used for CommonJS, but it is recommended to use ESM in line with recent JavaScript trends.

In addition, some functions use APIs supported by Node.js (e.g. `node:crypto`, `node:path`, `node:fs`). These functions may not work properly on the client side or cause module reference issues.

After configuring the Node.js environment, run the following command to install the library:

```bash
# via npm
$ npm install qsu

# via yarn
$ yarn add qsu

# via pnpm
$ pnpm install qsu
```

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

This is a good way to distinguish which function is a utility function being used by `qsu`, but it is not recommended because it loads all functions at once, making it impossible to reduce capacity through tree-shaking. Therefore, you should choose the appropriate method depending on the size of the project.

```javascript
import _ from 'qsu';

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

<span class="node-required">Requires a Node.js runtime ('qsu/node')</span>

For more information on all other supported functions, see the [Reference](/reference/index.md) documentation.
