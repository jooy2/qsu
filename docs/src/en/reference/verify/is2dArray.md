# is2dArray <Lang dart js python />

Returns `true` if the given array is a two-dimensional array.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true }
]" />

## Returns

> boolean

## Examples

::: lang js

```javascript
is2dArray([1]); // Returns false
is2dArray([[1], [2]]); // Returns true
```

:::

::: lang dart

```dart
is2dArray([1]); // Returns false
is2dArray([[1], [2]]); // Returns true
```

:::

::: lang python

```python
is2dArray([1])  # Returns False
is2dArray([[1], [2]])  # Returns True
```

:::
