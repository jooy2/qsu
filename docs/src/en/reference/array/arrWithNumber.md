# arrWithNumber <Lang dart js python />

Creates and returns an Array in the order of start...end values.

## Parameters

<ParamsTable :rows="[
	{ name: 'start', type: 'number', required: true },
	{ name: 'end', type: 'number', required: true }
]" />

## Returns

<ReturnType type="number[]" />

## Examples

::: lang js

```javascript
arrWithNumber(1, 3); // Returns [1, 2, 3]
arrWithNumber(0, 3); // Returns [0, 1, 2, 3]
```

:::

::: lang dart

```dart
arrWithNumber(1, 3); // Returns [1, 2, 3]
arrWithNumber(0, 3); // Returns [0, 1, 2, 3]
```

:::

::: lang python

```python
arrWithNumber(1, 3)  # Returns [1, 2, 3]
arrWithNumber(0, 3)  # Returns [0, 1, 2, 3]
```

:::
