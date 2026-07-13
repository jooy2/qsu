# arrCount <Lang dart js python />

Returns the number of duplicates for each unique value in the given array. The array values can only be of type `String` or `Number`.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'string[] | number[]', required: true },
	{ name: 'count', type: 'number', required: true }
]" />

## Returns

> object

## Examples

::: code-group

```javascript [JavaScript]
arrCount(['a', 'a', 'a', 'b', 'c', 'b', 'a', 'd']); // Returns { a: 4, b: 2, c: 1, d: 1 }
```

```dart [Dart]
arrCount(['a', 'a', 'a', 'b', 'c', 'b', 'a', 'd']); // Returns { a: 4, b: 2, c: 1, d: 1 }
```

```python [Python]
arrCount(['a', 'a', 'a', 'b', 'c', 'b', 'a', 'd'])  # Returns { 'a': 4, 'b': 2, 'c': 1, 'd': 1 }
```

:::
