# arrTo1dArray <Lang dart js python />

다차원 배열의 모든 요소를 1차원 배열로 병합합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true }
]" />

## Returns

<ReturnType type="any[]" />

## Examples

::: lang js

```javascript
arrTo1dArray([1, 2, [3, 4]], 5); // Returns [1, 2, 3, 4, 5]
```

:::

::: lang dart

```dart
arrTo1dArray([1, 2, [3, 4]], 5); // Returns [1, 2, 3, 4, 5]
```

:::

::: lang python

```python
arrTo1dArray([1, 2, [3, 4]], 5)  # Returns [1, 2, 3, 4, 5]
```

:::
