# arrUnique

중복 값을 제거한 새 배열을 반환합니다. 같은 값 중 처음 나온 것을 원래 자리에 남깁니다.

[arrDifference](./arrDifference), [arrIntersection](./arrIntersection)과 마찬가지로 참조가 아닌 **값 기준**으로 비교합니다. 내용이 같은 중첩 배열과 객체는 중복이며, 남는 항목은 복사본이 아니라 원래 항목입니다. 타입 변환은 하지 않으므로 `1`과 `'1'`은 서로 다른 값이고, `1`과 `1.0`은 같은 숫자입니다.

객체는 JSON 형태로 비교하므로 키가 같아도 순서가 다르면 서로 다른 값입니다.

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
arrUnique([{ a: 1 }, { a: 1 }, { a: 2 }]); // Returns [{ a: 1 }, { a: 2 }]
arrUnique([1, '1', 1.0]); // Returns [1, '1']
```

:::

::: lang dart

```dart
arrUnique([1, 2, 2, 3]); // Returns [1, 2, 3]
arrUnique([[1], [1], [2]]); // Returns [[1], [2]]
arrUnique([{'a': 1}, {'a': 1}, {'a': 2}]); // Returns [{'a': 1}, {'a': 2}]
arrUnique([1, '1', 1.0]); // Returns [1, '1']
```

:::

::: lang python

```python
arrUnique([1, 2, 2, 3])  # Returns [1, 2, 3]
arrUnique([[1], [1], [2]])  # Returns [[1], [2]]
arrUnique([{'a': 1}, {'a': 1}, {'a': 2}])  # Returns [{'a': 1}, {'a': 2}]
arrUnique([1, '1', 1.0])  # Returns [1, '1']
```

:::
