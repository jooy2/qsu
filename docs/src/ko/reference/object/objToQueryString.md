# objToQueryString <Lang dart js />

주어진 객체 데이터를 URL 쿼리 문자열로 변환합니다.

## Parameters

- `obj::object`

## Returns

> string

## Examples

```javascript
objToQueryString({
	hello: 'world',
	test: 1234,
	arr: [1, 2, 3]
}); // Returns 'hello=world&test=1234&arr=%5B1%2C2%2C3%5D'
```
