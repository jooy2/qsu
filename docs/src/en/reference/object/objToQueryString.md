# objToQueryString <Lang dart js python />

Converts the given object data to a URL query string.

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
objToQueryString({
	hello: 'world',
	test: 1234,
	arr: [1, 2, 3]
}); // Returns 'hello=world&test=1234&arr=%5B1%2C2%2C3%5D'
```

:::

::: lang dart

```dart
objToQueryString({
  'hello': 'world',
  'test': 1234,
  'arr': [1, 2, 3]
}); // Returns 'hello=world&test=1234&arr=%5B1%2C2%2C3%5D'
```

:::

::: lang python

```python
objToQueryString({
	'hello': 'world',
	'test': 1234,
	'arr': [1, 2, 3]
})  # Returns 'hello=world&test=1234&arr=%5B1%2C2%2C3%5D'
```

:::
