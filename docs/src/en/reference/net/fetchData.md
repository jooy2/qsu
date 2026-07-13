# fetchData <Lang js python />

<NodeRequired en />

This function is used to make `node:fetch` easier to use while ensuring data is returned regardless of the response status. By default, it uses the `GET` method, but other methods such as `POST` can also be used with separate options.

Depending on the `Content-Type` of the request URL, the returned data can be either a string or an object.

If the request fails, returns a `204 (No Content)` status code, or an error occurs, it returns `null` without throwing a separate exception.

However, you can receive error details via the `onError` event.

## Parameters

<ParamsTable :rows="[
	{ name: 'url', type: 'string', required: true },
	{ name: 'httpRequestOptions', type: 'HTTPRequestOption', desc: 'Request options. See the table below.' }
]" />

<ParamsTable name="HTTPRequestOption" :rows="[
	{ name: 'auth', type: 'object', desc: 'Authentication credentials. See the table below.' },
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
