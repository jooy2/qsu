# arrCount <Lang dart js python />

Returns the number of duplicates for each unique value in the given array. The array values can only be of type `String` or `Number`.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: { js: 'string[] | number[]', dart: 'List<dynamic>' }, required: true },
	{ name: 'count', type: 'number', required: true }
]" />

## Returns

<ReturnType :type="{ js: 'object', dart: 'Map<String, int>' }" />

## Examples

::: lang js

```javascript
arrCount(['a', 'a', 'a', 'b', 'c', 'b', 'a', 'd']); // Returns { a: 4, b: 2, c: 1, d: 1 }
```

:::

::: lang dart

```dart
arrCount(['a', 'a', 'a', 'b', 'c', 'b', 'a', 'd']); // Returns { a: 4, b: 2, c: 1, d: 1 }
```

:::

::: lang python

```python
arrCount(['a', 'a', 'a', 'b', 'c', 'b', 'a', 'd'])  # Returns { 'a': 4, 'b': 2, 'c': 1, 'd': 1 }
```

:::
