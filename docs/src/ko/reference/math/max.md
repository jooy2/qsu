# max <Lang js dart python />

주어진 숫자 중 가장 큰 값을 반환합니다. [sum](./sum)과 마찬가지로 n개의 인수 또는 숫자의 단일 배열을 모두 받습니다.

숫자가 아닌 값은 `sum`과 동일하게 건너뜁니다. `NaN`도 건너뛰는데, 비교에서 항상 지기 때문에 그대로 두면 처음 등장한 뒤 교체되지 않아 결과가 되어버리기 때문입니다. 비교할 값이 하나도 없으면(빈 배열이거나 인수가 없는 경우) `null`을 반환합니다. Python에서는 `None`입니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'numbers', type: '...number[]', required: true, desc: '비교할 숫자입니다. n개의 인수 또는 단일 배열로 전달합니다.' }
]" />

## Returns

<ReturnType :type="{ js: 'number | null', dart: 'num?' }" />

## Examples

::: lang js

```javascript
max(1, 2, 3); // Returns 3
max([4, 2, 8, 6]); // Returns 8
max(-4, -2, -8); // Returns -2
max([]); // Returns null
```

:::

::: lang dart

```dart
max([1, 2, 3]); // Returns 3
max([4, 2, 8, 6]); // Returns 8
max([-4, -2, -8]); // Returns -2
max([]); // Returns null
```

:::

::: lang python

```python
max(1, 2, 3)  # Returns 3
max([4, 2, 8, 6])  # Returns 8
max(-4, -2, -8)  # Returns -2
max([])  # Returns None
```

:::
