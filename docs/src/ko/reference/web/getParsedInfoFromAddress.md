# getParsedInfoFromAddress <Lang js dart python />

주소 문자열을 각 구성요소로 파싱하여 객체로 반환합니다. 일반적인 웹 URL뿐만 아니라 호스트만 있는 주소, IPv4, IPv6(맨몸 또는 `[]`로 감싼 형태), 그리고 `ssh://user:pass@host:port`처럼 사용자 정보를 포함하는 SSH 스타일 접속 문자열도 처리합니다.

파싱 규칙은 의도적으로 범용적입니다.

- 프로토콜은 문자열에 `://`가 포함된 경우에만 인식됩니다(따라서 `host:1234`는 `host` 스킴이 아니라 호스트와 포트로 취급됩니다). 반환 시 대문자로 변환됩니다.
- 스킴, 포트, 사용자 정보에 기본값을 채우지 않습니다. 입력에 없는 값은 `undefined`(JavaScript) 또는 `null`(Dart/Python)로 반환됩니다.
- 사용자 정보는 **마지막** `@`를 기준으로 호스트와 분리하고, 사용자와 비밀번호는 **첫번째** `:`를 기준으로 분리합니다. 이렇게 하면 비밀번호 안에 포함된 `@`와 `:`가 보존됩니다.
- 맨몸 IPv6 주소(`::1`, `fe80::1`)는 콜론이 2개 이상인 것으로 판별하며 포트를 가질 수 없습니다. 포트를 붙이려면 대괄호로 감싸야 합니다(`[::1]:22`). 대괄호는 호스트의 일부로 유지됩니다.
- 경로, 쿼리, 프래그먼트(첫 `/`, `?`, `#` 이후의 모든 것)는 버려집니다.
- `error`는 입력을 파싱할 수 없는 경우(빈 입력, 잘못된 포트, 닫히지 않은 `[`)에만 `true`가 됩니다. 단순히 값이 없는 것은 `error`를 설정하지 **않습니다**.

## Parameters

- `url::string`

## Returns

> object

## Examples

::: code-group

```javascript [JavaScript]
getParsedInfoFromAddress('ssh://test:pass@host:1234');
getParsedInfoFromAddress('https://google.com');
getParsedInfoFromAddress('[fe80::f9e9:1d57:9f2d:fb87]:1234');
```

```dart [Dart]
getParsedInfoFromAddress('ssh://test:pass@host:1234');
getParsedInfoFromAddress('https://google.com');
getParsedInfoFromAddress('[fe80::f9e9:1d57:9f2d:fb87]:1234');
```

```python [Python]
getParsedInfoFromAddress('ssh://test:pass@host:1234')
getParsedInfoFromAddress('https://google.com')
getParsedInfoFromAddress('[fe80::f9e9:1d57:9f2d:fb87]:1234')
```

:::

반환값 예시:

```json5
// getParsedInfoFromAddress('ssh://test:pass@host:1234')
{
	error: false,
	protocol: 'SSH',
	host: 'host',
	port: 1234,
	user: 'test',
	pass: 'pass'
}

// getParsedInfoFromAddress('https://google.com')
// 없는 값은 `undefined`(JavaScript) 또는 `null`(Dart/Python)입니다.
{
	error: false,
	protocol: 'HTTPS',
	host: 'google.com',
	port: undefined,
	user: undefined,
	pass: undefined
}

// getParsedInfoFromAddress('host:abc') -> 잘못된 포트
{
	error: true,
	protocol: undefined,
	host: 'host',
	port: undefined,
	user: undefined,
	pass: undefined
}
```
