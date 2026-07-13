# arrWithNumber <Lang dart js python />

시작...끝 값의 순서로 배열을 생성하고 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'start', type: 'number', required: true },
	{ name: 'end', type: 'number', required: true }
]" />

## Returns

> number[]

## Examples

::: code-group

```javascript [JavaScript]
arrWithNumber(1, 3); // Returns [1, 2, 3]
arrWithNumber(0, 3); // Returns [0, 1, 2, 3]
```

```dart [Dart]
arrWithNumber(1, 3); // Returns [1, 2, 3]
arrWithNumber(0, 3); // Returns [0, 1, 2, 3]
```

```python [Python]
arrWithNumber(1, 3)  # Returns [1, 2, 3]
arrWithNumber(0, 3)  # Returns [0, 1, 2, 3]
```

:::
