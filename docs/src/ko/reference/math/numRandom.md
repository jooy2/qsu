# numRandom

min과 max값 사이 중 임의의 숫자를 선택하여 리턴합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'min', type: 'number', required: true },
	{ name: 'max', type: 'number', required: true }
]" />

## Returns

<ReturnType type="number" />

## Examples

::: lang js

```javascript
numRandom(1, 5); // Returns 1~5
numRandom(10, 20); // Returns 10~20
```

:::

::: lang dart

```dart
numRandom(1, 5); // Returns 1~5
numRandom(10, 20); // Returns 10~20
```

:::

::: lang python

```python
numRandom(1, 5)  # Returns 1~5
numRandom(10, 20)  # Returns 10~20
```

:::
