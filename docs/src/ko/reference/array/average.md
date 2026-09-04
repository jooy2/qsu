# average <Lang dart js python />

배열에 있는 모든 숫자 값의 평균을 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: { js: 'number[]', dart: 'List<double>' }, required: true }
]" />

## Returns

<ReturnType :type="{ js: 'number', dart: 'double', python: 'float' }" />

## Examples

::: lang js

```javascript
average([1, 5, 15, 50]); // Returns 17.75
```

:::

::: lang dart

```dart
average([1, 5, 15, 50]); // Returns 17.75
```

:::

::: lang python

```python
average([1, 5, 15, 50])  # Returns 17.75
```

:::
