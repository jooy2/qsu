# arrTo1dArray <Lang dart js python />

Merges all elements of a multidimensional array into a one-dimensional array.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true }
]" />

## Returns

> any[]

## Examples

::: code-group

```javascript [JavaScript]
arrTo1dArray([1, 2, [3, 4]], 5); // Returns [1, 2, 3, 4, 5]
```

```dart [Dart]
arrTo1dArray([1, 2, [3, 4]], 5); // Returns [1, 2, 3, 4, 5]
```

```python [Python]
arrTo1dArray([1, 2, [3, 4]], 5)  # Returns [1, 2, 3, 4, 5]
```

:::
