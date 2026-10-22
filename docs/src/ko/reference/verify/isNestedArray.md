# isNestedArray

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
