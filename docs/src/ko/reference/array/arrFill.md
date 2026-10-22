# arrFill

특정 길이의 기본값으로 배열을 초기화합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'value', type: 'any', required: true },
	{ name: 'length', type: 'number', default: '0' }
]" />

## Returns

<ReturnType type="any[]" />

## Examples

::: lang js

```javascript
arrFill('abc', 4); // Returns ['abc', 'abc', 'abc', 'abc']
arrFill(null, 3); // Returns [null, null, null]
```

:::

::: lang dart

```dart
arrFill('abc', 4); // Returns ['abc', 'abc', 'abc', 'abc']
arrFill(null, 3); // Returns [null, null, null]
```

:::

::: lang python

```python
arrFill('abc', 4)  # Returns ['abc', 'abc', 'abc', 'abc']
arrFill(None, 3)  # Returns [None, None, None]
```

:::
