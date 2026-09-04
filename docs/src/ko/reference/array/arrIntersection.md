# arrIntersection <Lang dart js python />

주어진 모든 배열에 공통으로 존재하는 값만 반환합니다.

결과는 중복이 제거되며 첫 번째 배열의 순서를 유지하므로, `arrIntersection([2, 1, 2], [2])`는 `[2]`를 반환합니다. 따라서 배열을 하나만 전달하면 중복을 제거한 결과와 같고, 배열을 하나도 전달하지 않으면 빈 배열을 반환합니다.

값은 참조가 아닌 **값 기준**으로 비교하므로 중첩 배열이나 객체도 비교됩니다. 예를 들어 `arrIntersection([[1], [2]], [[2], [3]])`은 `[[2]]`를 반환합니다. 타입 변환은 하지 않기 때문에 `1`과 `'1'`은 서로 다른 값입니다.

JavaScript와 Python에서는 배열들을 각각의 인자로 전달하고, Dart에서는 배열의 배열 하나로 전달합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'arrays', type: 'any[][]', required: true, desc: '교집합을 구할 배열들입니다. 원본은 변경되지 않습니다.' }
]" />

## Returns

> any[]

## Examples

::: lang js

```javascript
arrIntersection([2, 1], [2, 3]); // Returns [2]
arrIntersection([1, 2, 3], [2, 3, 4], [3, 2]); // Returns [2, 3]
arrIntersection([2, 1, 2], [2]); // Returns [2]
arrIntersection([1, 2], [3]); // Returns []
arrIntersection([[1], [2]], [[2], [3]]); // Returns [[2]]
```

:::

::: lang dart

```dart
arrIntersection([[2, 1], [2, 3]]); // Returns [2]
arrIntersection([[1, 2, 3], [2, 3, 4], [3, 2]]); // Returns [2, 3]
arrIntersection([[2, 1, 2], [2]]); // Returns [2]
arrIntersection([[1, 2], [3]]); // Returns []
arrIntersection([[[1], [2]], [[2], [3]]]); // Returns [[2]]
```

:::

::: lang python

```python
arrIntersection([2, 1], [2, 3])  # Returns [2]
arrIntersection([1, 2, 3], [2, 3, 4], [3, 2])  # Returns [2, 3]
arrIntersection([2, 1, 2], [2])  # Returns [2]
arrIntersection([1, 2], [3])  # Returns []
arrIntersection([[1], [2]], [[2], [3]])  # Returns [[2]]
```

:::
