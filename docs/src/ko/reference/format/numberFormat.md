# numberFormat
주어진 숫자를 쉼표 기호를 포함하여 읽기 쉽게 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'number', type: { js: 'number', python: 'int | float | str' }, required: true }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
numberFormat(1234567); // Returns 1,234,567
```

:::

::: lang dart

```dart
numberFormat(1234567); // Returns 1,234,567
```

:::

::: lang python

```python
numberFormat(1234567)  # Returns 1,234,567
```

:::
