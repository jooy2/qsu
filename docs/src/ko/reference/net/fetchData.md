# fetchData <Lang js python />

<NodeRequired ko />

이 함수는 `node:fetch`를 조금 더 쉽게 사용하면서도 응답 상태에 상관 없이 데이터를 반환받기 위해 사용됩니다. 기본적으로 `GET` method를 사용하지만 별도 옵션으로 `POST` 등의 method도 사용할 수 있습니다.

요청 URL의 `Content-Type`에 따라 반환하는 데이터 형식이 string이거나 object일 수 있습니다.

응답에 실패했거나 `204 (No Content)` 응답 코드일 때, 에러가 발생했을 때에도 별도의 exception 없이 `null`을 반환합니다.

다만 onError 이벤트를 통해 에러를 받아볼 수 있습니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'url', type: 'string', required: true },
	{ name: 'httpRequestOptions', type: 'HTTPRequestOption', desc: '요청 옵션입니다. 아래 표를 참고하세요.' }
]" />

<ParamsTable name="HTTPRequestOption" :rows="[
	{ name: 'auth', type: 'object', desc: '인증 정보입니다. 아래 표를 참고하세요.' },
	{ name: 'get', type: 'boolean', desc: `Same as \`method: 'get'\`` },
	{ name: 'post', type: 'boolean', desc: `Same as \`method: 'post'\`` },
	{ name: 'put', type: 'boolean', desc: `Same as \`method: 'put'\`` },
	{ name: 'delete', type: 'boolean', desc: `Same as \`method: 'delete'\`` },
	{ name: 'patch', type: 'boolean', desc: `Same as \`method: 'patch'\`` },
	{ name: 'toStream', type: 'boolean' },
	{ name: 'timeout', type: 'number' },
	{ name: 'method', type: `'get' | 'post' | 'put' | 'delete' | 'patch'` },
	{ name: 'host', type: 'string', desc: 'If this value is not specified, the URL must be a full path.' },
	{ name: 'queryParameters', type: 'object' },
	{ name: 'body', type: 'object | string | FormData | null' },
	{ name: 'bodyType', type: `'text' | 'json' | 'form-data' | 'x-www-form-urlencoded'` },
	{ name: 'headers', type: 'object | null' },
	{ name: 'onError', type: 'function', desc: '(error) => void' }
]" />

<ParamsTable name="auth" :rows="[
	{ name: 'apiKey', type: 'string', desc: `'x-API-key' header` },
	{ name: 'bearer', type: 'string', desc: `'Authorization Bearer' header` }
]" />

## Returns

> string | null | object

## Examples

::: code-group

```javascript [JavaScript]
console.log(await fetchData('https://github.com'), { get: true });
```

```python [Python]
print(fetchData('https://github.com'), { 'get': True })
```

:::
