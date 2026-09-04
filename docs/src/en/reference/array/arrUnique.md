# arrUnique <Lang dart js python />

Remove duplicate values from array and two-dimensional array data. In the case of 2d arrays, json type data duplication is not removed.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true }
]" />

## Returns

> any[]

## Examples

::: lang js

```javascript
arrUnique([1, 2, 2, 3]); // Returns [1, 2, 3]
arrUnique([[1], [1], [2]]); // Returns [[1], [2]]
```

:::

::: lang dart

```dart
arrUnique([1, 2, 2, 3]); // Returns [1, 2, 3]
arrUnique([[1], [1], [2]]); // Returns [[1], [2]]
```

:::

::: lang python

```python
arrUnique([1, 2, 2, 3])  # Returns [1, 2, 3]
arrUnique([[1], [1], [2]])  # Returns [[1], [2]]
```

:::
