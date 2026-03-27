# fetchData <Lang js />

<NodeRequired en />

This function is used to make `node:fetch` easier to use while ensuring data is returned regardless of the response status. By default, it uses the `GET` method, but other methods such as `POST` can also be used with separate options.

Depending on the `Content-Type` of the request URL, the returned data can be either a string or an object.

If the request fails, returns a `204 (No Content)` status code, or an error occurs, it returns `null` without throwing a separate exception.

However, you can receive error details via the `onError` event.

## Parameters

- `url::string`
- `httpRequestOptions::object`

```typescript
interface HTTPRequestOption {
	auth?: {
		apiKey?: string; // 'x-API-key' header
		bearer?: string; // 'Authorization Bearer' header
	};
	get?: boolean; // Same as `method: 'get'`
	post?: boolean; // Same as `method: 'post'`
	put?: boolean; // Same as `method: 'put'`
	delete?: boolean; // Same as `method: 'delete'`
	patch?: boolean; // Same as `method: 'patch'`
	method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
	host?: string; // If this value is not specified, the URL must be a full path.
	queryParameters?: object;
	body?: AnyValueObject | string | undefined | null | FormData;
	bodyType?: 'text' | 'json' | 'form-data' | 'x-www-form-urlencoded';
	headers?: AnyValueObject | undefined | null;
	onError?: (error: any) => void;
}
```

## Returns

> string | null | object

## Examples

```javascript
console.log(await fetchData('https://github.com'), { get: true });
```
