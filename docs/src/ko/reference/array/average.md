# average

배열에 있는 모든 숫자 값의 평균을 반환합니다.

빈 배열에는 평균이 없으므로 `NaN`을 반환합니다.

가운데 값은 [median](./median)으로 구하세요.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: { js: 'number[]', dart: 'List<num>', python: 'list[float]' }, required: true }
]" />

## Returns

<ReturnType :type="{ js: 'number', dart: 'double', python: 'float' }" />

## Examples

::: lang js

```javascript
average([1, 5, 15, 50]); // Returns 17.75
average([]); // Returns NaN
```

:::

::: lang dart

```dart
average([1, 5, 15, 50]); // Returns 17.75
average([]); // Returns NaN
```

:::

::: lang python

```python
average([1, 5, 15, 50])  # Returns 17.75
average([])  # Returns nan
```

:::
