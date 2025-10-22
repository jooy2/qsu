# objToQueryString <Lang dart js />

Converts the given object data to a URL query string.

## Parameters

- `obj::object`

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
objToQueryString({
	hello: 'world',
	test: 1234,
	arr: [1, 2, 3]
}); // Returns 'hello=world&test=1234&arr=%5B1%2C2%2C3%5D'
```

```dart [Dart]
objToQueryString({
  'hello': 'world',
  'test': 1234,
  'arr': [1, 2, 3]
}); // Returns 'hello=world&test=1234&arr=%5B1%2C2%2C3%5D'
```

:::
