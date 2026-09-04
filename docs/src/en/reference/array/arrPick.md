# arrPick
Returns a random item from the given array. If the array is empty or is not an array, it returns `null`.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true }
]" />

## Returns

<ReturnType type="any | null" />

## Examples

::: lang js

```javascript
arrPick([1, 2, 3, 4, 5]); // Returns 1 or 2 or 3 or 4 or 5
arrPick([]); // Returns null
```

:::

::: lang dart

```dart
arrPick([1, 2, 3, 4, 5]); // Returns 1 or 2 or 3 or 4 or 5
arrPick([]); // Returns null
```

:::

::: lang python

```python
arrPick([1, 2, 3, 4, 5])  # Returns 1 or 2 or 3 or 4 or 5
arrPick([])  # Returns None
```

:::
