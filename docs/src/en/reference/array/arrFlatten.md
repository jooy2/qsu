# arrFlatten

Merges all elements of a multidimensional array into a one-dimensional array.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true }
]" />

## Returns

<ReturnType type="any[]" />

## Examples

::: lang js

```javascript
arrFlatten([1, 2, [3, 4]], 5); // Returns [1, 2, 3, 4, 5]
```

:::

::: lang dart

```dart
arrFlatten([1, 2, [3, 4]], 5); // Returns [1, 2, 3, 4, 5]
```

:::

::: lang python

```python
arrFlatten([1, 2, [3, 4]], 5)  # Returns [1, 2, 3, 4, 5]
```

:::
