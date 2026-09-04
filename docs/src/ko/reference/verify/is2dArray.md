# is2dArray <Lang dart js python />

지정된 배열이 2차원 배열이면 `true`를 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true }
]" />

## Returns

<ReturnType type="boolean" />

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
