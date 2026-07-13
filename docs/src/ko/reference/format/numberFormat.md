# numberFormat <Lang dart js python />

주어진 숫자를 쉼표 기호를 포함하여 읽기 쉽게 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'number', type: 'number', required: true }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
numberFormat(1234567); // Returns 1,234,567
```

```dart [Dart]
numberFormat(1234567); // Returns 1,234,567
```

```python [Python]
numberFormat(1234567)  # Returns 1,234,567
```

:::
