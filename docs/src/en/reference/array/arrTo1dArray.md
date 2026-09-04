# arrTo1dArray <Lang dart js python />

Merges all elements of a multidimensional array into a one-dimensional array.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true }
]" />

## Returns

> any[]

## Examples

::: lang js

```javascript
arrTo1dArray([1, 2, [3, 4]], 5); // Returns [1, 2, 3, 4, 5]
```

:::

::: lang dart

```dart
arrTo1dArray([1, 2, [3, 4]], 5); // Returns [1, 2, 3, 4, 5]
```

:::

::: lang python

```python
arrTo1dArray([1, 2, [3, 4]], 5)  # Returns [1, 2, 3, 4, 5]
```

:::
