# isValidDate <Lang js python />

지정된 날짜가 실제로 존재하는지 확인합니다. `YYYY-MM-DD` 형식으로만 확인합니다.

날짜는 `1600-01-01`부터 `9999-12-31`까지만 확인할 수 있으며, `1600` 이전의 모든 날짜는 `false`로 반환됩니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'date', type: 'string', required: true }
]" />

## Returns

> boolean

## Examples

::: code-group

```javascript [JavaScript]
isValidDate('2021-01-01'); // Returns true
isValidDate('2021-02-30'); // Returns false
```

```dart [Dart]
isValidDate('2021-01-01'); // Returns true
isValidDate('2021-02-30'); // Returns false
```

```python [Python]
isValidDate('2021-01-01')  # Returns True
isValidDate('2021-02-30')  # Returns False
```

:::
