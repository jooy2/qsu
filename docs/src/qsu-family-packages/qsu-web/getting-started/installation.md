# `qsu-web` Installation

Qsu has utilities organized into separate packages. Currently, there is a package called `qsu-web`.

The `qsu-web` package contains a collection of utility functions that are commonly used on web pages.

General installation and use is almost identical to the `qsu` package.

```bash
# via npm
$ npm install qsu-web

# via yarn
$ yarn add qsu-web

# via pnpm
$ pnpm install qsu-web
```

```javascript
import { isBotAgent } from 'qsu-web';

function main() {
	console.log(
		isBotAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html')
	); // true
}
```
