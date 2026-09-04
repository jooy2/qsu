# isValidDate
지정된 날짜가 실제로 존재하는지 확인합니다. `YYYY-MM-DD` 형식으로만 확인합니다.

지원하는 연도는 `1600`~`9999`이며, 두 자리 연도 `16`~`99`도 허용합니다. 그 외의 연도는 `false`를 반환합니다. `YYYY-MM-DD` 형식이 아닌 입력은 `false`가 아니라 **예외**가 발생합니다.

날짜는 `1600-01-01`부터 `9999-12-31`까지만 확인할 수 있으며, `1600` 이전의 모든 날짜는 `false`로 반환됩니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'date', type: 'string', required: true }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
isValidDate('2021-01-01'); // Returns true
isValidDate('2021-02-30'); // Returns false
```

:::

::: lang dart

```dart
isValidDate('2021-01-01'); // Returns true
isValidDate('2021-02-30'); // Returns false
```

:::

::: lang python

```python
isValidDate('2021-01-01')  # Returns True
isValidDate('2021-02-30')  # Returns False
```

:::
