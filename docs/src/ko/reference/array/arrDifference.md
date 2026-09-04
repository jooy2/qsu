# arrDifference <Lang dart js python />

첫 번째 배열의 값 중에서 나머지 배열들 어디에도 포함되지 않은 값만 반환합니다.

원본 순서가 유지되며 남은 값의 중복도 제거하지 않으므로, `arrDifference([2, 1, 2, 3], [1])`은 `[2, 2, 3]`을 반환합니다.

값은 참조가 아닌 **값 기준**으로 비교하므로 중첩 배열이나 객체도 비교됩니다. 예를 들어 `arrDifference([[1], [2]], [[1]])`은 `[[2]]`를 반환합니다. 타입 변환은 하지 않기 때문에 `1`과 `'1'`은 서로 다른 값입니다.

::: lang js python

제외할 배열들은 추가 인자로 전달합니다.

:::

::: lang dart

제외할 배열들은 배열의 배열 하나로 전달합니다.

:::

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true, desc: '대상 배열입니다. 원본은 변경되지 않습니다.' },
	{ name: 'others', type: 'any[][]', desc: '제외할 값이 담긴 배열들입니다. 생략하면 `array`의 복사본이 반환됩니다.' }
]" />

## Returns

<ReturnType type="any[]" />

## Examples

::: lang js

```javascript
arrDifference([2, 1, 3], [2, 3]); // Returns [1]
arrDifference([2, 1, 2, 3], [1]); // Returns [2, 2, 3]
arrDifference([1, 2, 3, 4], [2], [4]); // Returns [1, 3]
arrDifference([[1], [2]], [[1]]); // Returns [[2]]
arrDifference([1, '1'], [1]); // Returns ['1']
```

:::

::: lang dart

```dart
arrDifference([2, 1, 3], [[2, 3]]); // Returns [1]
arrDifference([2, 1, 2, 3], [[1]]); // Returns [2, 2, 3]
arrDifference([1, 2, 3, 4], [[2], [4]]); // Returns [1, 3]
arrDifference([[1], [2]], [[[1]]]); // Returns [[2]]
arrDifference([1, '1'], [[1]]); // Returns ['1']
```

:::

::: lang python

```python
arrDifference([2, 1, 3], [2, 3])  # Returns [1]
arrDifference([2, 1, 2, 3], [1])  # Returns [2, 2, 3]
arrDifference([1, 2, 3, 4], [2], [4])  # Returns [1, 3]
arrDifference([[1], [2]], [[1]])  # Returns [[2]]
arrDifference([1, '1'], [1])  # Returns ['1']
```

:::
