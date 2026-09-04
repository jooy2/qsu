# objToArray <Lang dart js python />

Converts the given object to array format. The resulting array is a two-dimensional array with one key value stored as follows: `[key, value]`. If the `recursive` option is `true`, it will convert to a two-dimensional array again when the value is of type `object`.

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true },
	{ name: 'recursive', type: 'boolean', named: true, default: 'false' }
]" />

## Returns

> any[]

## Examples

::: lang js

```javascript
objToArray({
	a: 1.234,
	b: 'str',
	c: [1, 2, 3],
	d: { a: 1 }
}); // Returns [['a', 1.234], ['b', 'str'], ['c', [1, 2, 3]], ['d', { a: 1 }]]
```

:::

::: lang dart

```dart
objToArray({
  'a': 1.234,
  'b': 'str',
  'c': [1, 2, 3],
  'd': { 'a': 1 }
}); // Returns [['a', 1.234], ['b', 'str'], ['c', [1, 2, 3]], ['d', { 'a': 1 }]]
```

:::

::: lang python

```python
objToArray({
	'a': 1.234,
	'b': 'str',
	'c': [1, 2, 3],
	'd': { 'a': 1 }
})  # Returns [['a', 1.234], ['b', 'str'], ['c', [1, 2, 3]], ['d', { 'a': 1 }]]
```

:::
