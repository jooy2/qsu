# arrMove
Moves the position of a specific element in an array to the specified position. (Position starts from 0.)

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true },
	{ name: 'from', type: 'number', required: true },
	{ name: 'to', type: 'number', required: true }
]" />

## Returns

<ReturnType type="any[]" />

## Examples

::: lang js

```javascript
arrMove([1, 2, 3, 4], 1, 0); // Returns [2, 1, 3, 4]
```

:::

::: lang dart

```dart
arrMove([1, 2, 3, 4], 1, 0); // Returns [2, 1, 3, 4]
```

:::

::: lang python

```python
arrMove([1, 2, 3, 4], 1, 0)  # Returns [2, 1, 3, 4]
```

:::
