# isTrueAtLeast

`conditions` 배열에 있는 값이 최소 `count` 번 참이면 `true`를 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'conditions', type: 'boolean[]', required: true },
	{ name: 'count', type: 'number', named: true, default: '1' }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
const left = 1;
const right = 1 + 2;

isTrueAtLeast([true, true, false], 2); // Returns true
isTrueAtLeast([true, true, false], 3); // Returns false
isTrueAtLeast([true, true, left === right], 3); // Returns false
```

:::

::: lang dart

```dart
final int left = 1;
final int right = 1 + 2;

isTrueAtLeast([true, true, false], count: 2); // Returns true
isTrueAtLeast([true, true, false], count: 3); // Returns false
isTrueAtLeast([true, true, left === right], count: 3); // Returns false
```

:::

::: lang python

```python
left = 1
right = 1 + 2

isTrueAtLeast([True, True, False], 2)  # Returns True
isTrueAtLeast([True, True, False], 3)  # Returns False
isTrueAtLeast([True, True, left == right], 3)  # Returns False
```

:::
