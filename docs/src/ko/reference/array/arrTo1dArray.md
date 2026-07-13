# arrTo1dArray <Lang dart js python />

다차원 배열의 모든 요소를 1차원 배열로 병합합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true }
]" />

## Returns

> any[]

## Examples

::: code-group

```javascript [JavaScript]
arrTo1dArray([1, 2, [3, 4]], 5); // Returns [1, 2, 3, 4, 5]
```

```dart [Dart]
arrTo1dArray([1, 2, [3, 4]], 5); // Returns [1, 2, 3, 4, 5]
```

```python [Python]
arrTo1dArray([1, 2, [3, 4]], 5)  # Returns [1, 2, 3, 4, 5]
```

:::
