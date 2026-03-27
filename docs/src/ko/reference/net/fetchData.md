# fetchData <Lang js />

<NodeRequired ko />

이 함수는 `node:fetch`를 조금 더 쉽게 사용하면서도 응답 상태에 상관 없이 데이터를 반환받기 위해 사용됩니다. 기본적으로 `GET` method를 사용하지만 별도 옵션으로 `POST` 등의 method도 사용할 수 있습니다.

요청 URL의 `Content-Type`에 따라 반환하는 데이터 형식이 string이거나 object일 수 있습니다.

응답에 실패했거나 `204 (No Content)` 응답 코드일 때, 에러가 발생했을 때에도 별도의 exception 없이 `null`을 반환합니다.

다만 onError 이벤트를 통해 에러를 받아볼 수 있습니다.

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
