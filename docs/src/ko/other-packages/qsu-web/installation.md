# 설치

Qsu에는 유틸리티가 별도의 패키지로 구성되어 있습니다. 현재 `qsu-web`이라는 패키지가 있습니다.

`qsu-web` 패키지에는 웹 페이지에서 일반적으로 사용되는 유틸리티 함수 모음이 포함되어 있습니다.

일반적인 설치 및 사용법은 `qsu` 패키지와 거의 동일합니다.

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
