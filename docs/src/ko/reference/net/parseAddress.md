# parseAddress

주소 문자열을 각 구성요소로 파싱하여 객체로 반환합니다. 일반적인 웹 URL뿐만 아니라 호스트만 있는 주소, IPv4, IPv6(맨몸 또는 `[]`로 감싼 형태), 그리고 `ssh://user:pass@host:port`처럼 사용자 정보를 포함하는 SSH 스타일 접속 문자열도 처리합니다.

파싱 규칙은 의도적으로 범용적입니다.

- 프로토콜은 문자열에 `://`가 포함된 경우에만 인식됩니다(따라서 `host:1234`는 `host` 스킴이 아니라 호스트와 포트로 취급됩니다). 반환 시 대문자로 변환됩니다.
- 어떤 값도 기본값으로 채우지 않습니다. 입력에 없는 값은 <Val js="undefined" dart="null" python="None" />이고, 스킴이 보통 쓰는 포트는 `port`에 채우지 않고 `defaultPort`로 따로 알려줍니다.
- 사용자 정보는 **마지막** `@`를 기준으로 호스트와 분리하고, 사용자와 비밀번호는 **첫번째** `:`를 기준으로 분리합니다. 이렇게 하면 비밀번호 안에 포함된 `@`와 `:`가 보존됩니다.
- 맨몸 IPv6 주소(`::1`, `fe80::1`)는 콜론이 2개 이상인 것으로 판별하며 포트를 가질 수 없습니다. 포트를 붙이려면 대괄호로 감싸야 합니다(`[::1]:22`). `host`는 대괄호를 그대로 두고, `hostname`은 떼어냅니다.
- `error`는 입력을 파싱할 수 없는 경우(빈 입력, 잘못된 포트, 닫히지 않은 `[`)에만 `true`가 됩니다. 단순히 값이 없는 것은 `error`를 설정하지 **않습니다**.

직접 만든 URL을 뜯어볼 때는 각 런타임이 가진 URL 타입이 낫습니다. 이 함수는 사람이 입력한 주소, 그러니까 호스트 이름 하나뿐일 수도 있고 비밀번호를 달고 올 수도 있으며 URL 파서가 모르는 스킴을 쓸 수도 있는 문자열을 위한 것입니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'url', type: 'string', required: true, desc: '파싱할 주소입니다. 앞뒤 공백은 읽기 전에 제거합니다.' },
	{ name: 'options', type: 'ParseAddressOptions', named: true, desc: '아래 표를 참고하세요.' }
]" />

<ParamsTable name="ParseAddressOptions" :rows="[
	{ name: 'decode', type: 'boolean', default: 'true', desc: '`user`, `pass`, 그리고 `params`의 값에 들어 있는 `%XX` 이스케이프를 원래 문자로 되돌립니다. 이스케이프가 아닌 `%`가 섞여 있거나 올바른 UTF-8이 되지 않는 이스케이프가 있으면, 절반만 디코딩하지 않고 쓰인 그대로 돌려줍니다.' }
]" />

## Returns

<ReturnType :type="{ js: 'object', dart: 'ParsedAddress' }" />

<ParamsTable name="ParsedAddress" :rows="[
	{ name: 'error', type: 'boolean', desc: '주소를 파싱하지 못했는지를 나타냅니다. 항상 들어 있습니다.' },
	{ name: 'protocol', type: 'string', desc: '`SSH`, `HTTPS`처럼 대문자로 바꾼 스킴입니다. 주소에 `://`가 없으면 들어 있지 않습니다.' },
	{ name: 'host', type: 'string', desc: '쓰인 그대로의 호스트입니다. 대괄호로 감싼 IPv6 주소라면 대괄호까지 포함합니다.' },
	{ name: 'hostname', type: 'string', desc: '대괄호를 뗀 호스트입니다. 접속 라이브러리에 넘기는 형태입니다.' },
	{ name: 'port', type: 'number', desc: '주소에 적힌 포트입니다. 적혀 있지 않으면 프로토콜이 무엇이든 들어 있지 않습니다.' },
	{ name: 'defaultPort', type: 'number', desc: '해당 프로토콜이 보통 쓰는 포트입니다. `port`가 있든 없든 채워지므로, `port`는 주소가 직접 말한 값 그대로 남습니다. 어떤 스킴에 값이 있는지는 아래 표에 있습니다.' },
	{ name: 'user', type: 'string', desc: '사용자 정보에서 뽑은 사용자 이름입니다.' },
	{ name: 'pass', type: 'string', desc: '사용자 정보에서 뽑은 비밀번호입니다.' },
	{ name: 'path', type: 'string', desc: '첫 `/`부터 쿼리나 프래그먼트 직전까지이며, 앞의 `/`를 포함합니다.' },
	{ name: 'query', type: 'string', desc: '앞의 `?`를 뺀, 쓰인 그대로의 쿼리입니다.' },
	{ name: 'params', type: { js: 'object', dart: 'Map<String, String>' }, desc: '쿼리를 키와 값의 쌍으로 읽은 것입니다. 같은 키가 여러 번 나오면 마지막 값이 남고, 키가 빈 쌍은 빠집니다.' },
	{ name: 'hash', type: 'string', desc: '앞의 `#`을 뺀 프래그먼트입니다.' },
	{ name: 'isIP', type: 'boolean', desc: '`hostname`이 이름이 아니라 IPv4 또는 IPv6 주소인지를 나타냅니다. 항상 들어 있습니다.' },
	{ name: 'isIPv6', type: 'boolean', desc: '`hostname`이 IPv6 주소인지를 나타냅니다. 항상 들어 있습니다.' }
]" />

### Default ports

아래 스킴에 대해 `defaultPort`가 채워지며, 대소문자는 가리지 않습니다. 표에 없는 스킴은 이 값이 들어 있지 않습니다.

| Scheme                   | Port  |
| ------------------------ | ----- |
| `ftp`                    | 21    |
| `ssh`, `sftp`            | 22    |
| `telnet`                 | 23    |
| `smtp`                   | 25    |
| `dns`                    | 53    |
| `http`, `ws`             | 80    |
| `pop3`                   | 110   |
| `imap`                   | 143   |
| `ldap`                   | 389   |
| `https`, `wss`           | 443   |
| `smb`                    | 445   |
| `smtps`                  | 465   |
| `ldaps`                  | 636   |
| `ftps`                   | 990   |
| `imaps`                  | 993   |
| `pop3s`                  | 995   |
| `mssql`                  | 1433  |
| `mysql`                  | 3306  |
| `rdp`                    | 3389  |
| `postgres`, `postgresql` | 5432  |
| `vnc`                    | 5900  |
| `redis`                  | 6379  |
| `git`                    | 9418  |
| `mongodb`                | 27017 |

## Examples

::: lang js

```javascript
parseAddress('ssh://test:pass@host:1234');
parseAddress('https://google.com/search?q=hello#top');
parseAddress('[fe80::f9e9:1d57:9f2d:fb87]:1234');
parseAddress('ssh://us%40er:p%40ss@host', { decode: false });
```

:::

::: lang dart

```dart
parseAddress('ssh://test:pass@host:1234');
parseAddress('https://google.com/search?q=hello#top');
parseAddress('[fe80::f9e9:1d57:9f2d:fb87]:1234');
parseAddress('ssh://us%40er:p%40ss@host', decode: false);
```

:::

::: lang python

```python
parseAddress('ssh://test:pass@host:1234')
parseAddress('https://google.com/search?q=hello#top')
parseAddress('[fe80::f9e9:1d57:9f2d:fb87]:1234')
parseAddress('ssh://us%40er:p%40ss@host', decode=False)
```

:::

반환값 예시:

```json5
// parseAddress('ssh://test:pass@host:1234')
// 없는 값은 `undefined`(JavaScript) 또는 `null`(Dart/Python)이며, 아래에서는 생략했습니다.
{
	error: false,
	protocol: 'SSH',
	defaultPort: 22,
	host: 'host',
	hostname: 'host',
	port: 1234,
	user: 'test',
	pass: 'pass',
	isIP: false,
	isIPv6: false
}

// parseAddress('https://google.com/search?q=hello#top')
{
	error: false,
	protocol: 'HTTPS',
	defaultPort: 443,
	host: 'google.com',
	hostname: 'google.com',
	path: '/search',
	query: 'q=hello',
	params: { q: 'hello' },
	hash: 'top',
	isIP: false,
	isIPv6: false
}

// parseAddress('[fe80::f9e9:1d57:9f2d:fb87]:1234')
{
	error: false,
	host: '[fe80::f9e9:1d57:9f2d:fb87]',
	hostname: 'fe80::f9e9:1d57:9f2d:fb87',
	port: 1234,
	isIP: true,
	isIPv6: true
}

// parseAddress('host:abc') -> 잘못된 포트
{
	error: true,
	host: 'host',
	hostname: 'host',
	isIP: false,
	isIPv6: false
}
```
