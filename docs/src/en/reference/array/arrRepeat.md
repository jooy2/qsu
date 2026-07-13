# arrRepeat <Lang dart js python />

Repeats the data of an `Array` or `Object` a specific number of times and returns it as a 1d array.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[] | object', required: true },
	{ name: 'count', type: 'number', required: true }
]" />

## Returns

> any[]

## Examples

::: code-group

```javascript [JavaScript]
arrRepeat([1, 2, 3, 4], 3); // Returns [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
arrRepeat({ a: 1, b: 2 }, 2); // Returns [{ a: 1, b: 2 }, { a: 1, b: 2 }]
```

```dart [Dart]
arrRepeat([1, 2, 3, 4], 3); // Returns [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
arrRepeat({ a: 1, b: 2 }, 2); // Returns [{ a: 1, b: 2 }, { a: 1, b: 2 }]
```

```python [Python]
arrRepeat([1, 2, 3, 4], 3)  # Returns [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
arrRepeat({'a': 1, 'b': 2}, 2)  # Returns [{'a': 1, 'b': 2}, {'a': 1, 'b': 2}]
```

:::
