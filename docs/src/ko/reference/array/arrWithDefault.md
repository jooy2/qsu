# arrWithDefault <Lang dart js python />

특정 길이의 기본값으로 배열을 초기화합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'defaultValue', type: 'any', required: true },
	{ name: 'length', type: 'number', default: '0' }
]" />

## Returns

<ReturnType type="any[]" />

## Examples

::: lang js

```javascript
arrWithDefault('abc', 4); // Returns ['abc', 'abc', 'abc', 'abc']
arrWithDefault(null, 3); // Returns [null, null, null]
```

:::

::: lang dart

```dart
arrWithDefault('abc', 4); // Returns ['abc', 'abc', 'abc', 'abc']
arrWithDefault(null, 3); // Returns [null, null, null]
```

:::

::: lang python

```python
arrWithDefault('abc', 4)  # Returns ['abc', 'abc', 'abc', 'abc']
arrWithDefault(None, 3)  # Returns [None, None, None]
```

:::
