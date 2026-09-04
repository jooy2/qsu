# arrMove
배열의 특정 요소의 위치를 지정된 위치로 이동합니다. (위치는 0부터 시작합니다.)

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true },
	{ name: 'from', type: 'number', required: true },
	{ name: 'to', type: 'number', required: true }
]" />

## Returns

<ReturnType type="any[]" />

## Examples

::: lang js

```javascript
arrMove([1, 2, 3, 4], 1, 0); // Returns [2, 1, 3, 4]
```

:::

::: lang dart

```dart
arrMove([1, 2, 3, 4], 1, 0); // Returns [2, 1, 3, 4]
```

:::

::: lang python

```python
arrMove([1, 2, 3, 4], 1, 0)  # Returns [2, 1, 3, 4]
```

:::
