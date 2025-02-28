# objToQueryString <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Converts the given object data to a URL query string.

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
