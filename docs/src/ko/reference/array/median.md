# median

숫자 배열의 가운데 값을 반환합니다. 값의 개수가 짝수면 가운데 값이 하나로 정해지지 않으므로, 가운데 두 값의 평균을 반환합니다.

정렬은 복사본에서 하므로 배열의 순서는 바뀌지 않습니다. `NaN`은 [min](/ko/reference/math/min), [max](/ko/reference/math/max)와 마찬가지로 건너뜁니다. 비교할 값이 남지 않으면 `null`을 반환합니다.

평균은 [average](./average)로 구하세요.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: { js: 'number[]', dart: 'List<num>', python: 'list[float]' }, required: true, desc: '값을 읽을 숫자 배열입니다. 변경되지 않습니다.' }
]" />

## Returns

<ReturnType :type="{ js: 'number | null', dart: 'num?', python: 'float | None' }" />

## Examples

::: lang js

```javascript
median([3, 1, 2]); // Returns 2
median([4, 1, 3, 2]); // Returns 2.5
median([1, NaN, 3]); // Returns 2
median([]); // Returns null
```

:::

::: lang dart

```dart
median([3, 1, 2]); // Returns 2
median([4, 1, 3, 2]); // Returns 2.5
median([1, double.nan, 3]); // Returns 2.0
median([]); // Returns null
```

:::

::: lang python

```python
median([3, 1, 2])  # Returns 2
median([4, 1, 3, 2])  # Returns 2.5
median([1, float('nan'), 3])  # Returns 2.0
median([])  # Returns None
```

:::
