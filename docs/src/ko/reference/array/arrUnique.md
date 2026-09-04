# arrUnique <Lang dart js python />

배열과 2차원 배열 데이터에서 중복 값을 제거합니다. 2차원 배열의 경우, JSON 유형 데이터 중복은 제거되지 않습니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true }
]" />

## Returns

<ReturnType type="any[]" />

## Examples

::: lang js

```javascript
arrUnique([1, 2, 2, 3]); // Returns [1, 2, 3]
arrUnique([[1], [1], [2]]); // Returns [[1], [2]]
```

:::

::: lang dart

```dart
arrUnique([1, 2, 2, 3]); // Returns [1, 2, 3]
arrUnique([[1], [1], [2]]); // Returns [[1], [2]]
```

:::

::: lang python

```python
arrUnique([1, 2, 2, 3])  # Returns [1, 2, 3]
arrUnique([[1], [1], [2]])  # Returns [[1], [2]]
```

:::
