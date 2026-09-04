# arrPick
주어진 배열의 항목 중 하나를 무작위로 리턴합니다. 배열이 비어있거나 배열이 아닌 경우 `null`을 반환합니다.

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
