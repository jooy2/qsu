# isNestedArray

Returns `true` if the given array is a two-dimensional array.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
isNestedArray([1]); // Returns false
isNestedArray([[1], [2]]); // Returns true
```

:::

::: lang dart

```dart
isNestedArray([1]); // Returns false
isNestedArray([[1], [2]]); // Returns true
```

:::

::: lang python

```python
isNestedArray([1])  # Returns False
isNestedArray([[1], [2]])  # Returns True
```

:::
