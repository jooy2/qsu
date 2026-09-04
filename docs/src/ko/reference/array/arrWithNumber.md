# arrWithNumber <Lang dart js python />

시작...끝 값의 순서로 배열을 생성하고 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'start', type: 'number', required: true },
	{ name: 'end', type: 'number', required: true }
]" />

## Returns

<ReturnType type="number[]" />

## Examples

::: lang js

```javascript
arrWithNumber(1, 3); // Returns [1, 2, 3]
arrWithNumber(0, 3); // Returns [0, 1, 2, 3]
```

:::

::: lang dart

```dart
arrWithNumber(1, 3); // Returns [1, 2, 3]
arrWithNumber(0, 3); // Returns [0, 1, 2, 3]
```

:::

::: lang python

```python
arrWithNumber(1, 3)  # Returns [1, 2, 3]
arrWithNumber(0, 3)  # Returns [0, 1, 2, 3]
```

:::
