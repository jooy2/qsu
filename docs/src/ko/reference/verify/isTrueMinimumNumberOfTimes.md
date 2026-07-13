# isTrueMinimumNumberOfTimes <Lang dart js python />

`conditions` 배열에 있는 값이 최소 `minimumCount` 번 참이면 `true`를 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'conditions', type: 'boolean[]', required: true },
	{ name: 'minimumCount', type: 'number', named: true, default: '1' }
]" />

## Returns

> boolean

## Examples

::: code-group

```javascript [JavaScript]
const left = 1;
const right = 1 + 2;

isTrueMinimumNumberOfTimes([true, true, false], 2); // Returns true
isTrueMinimumNumberOfTimes([true, true, false], 3); // Returns false
isTrueMinimumNumberOfTimes([true, true, left === right], 3); // Returns false
```

```dart [Dart]
final int left = 1;
final int right = 1 + 2;

isTrueMinimumNumberOfTimes([true, true, false], minimumCount: 2); // Returns true
isTrueMinimumNumberOfTimes([true, true, false], minimumCount: 3); // Returns false
isTrueMinimumNumberOfTimes([true, true, left === right], minimumCount: 3); // Returns false
```

```python [Python]
left = 1
right = 1 + 2

isTrueMinimumNumberOfTimes([True, True, False], 2)  # Returns True
isTrueMinimumNumberOfTimes([True, True, False], 3)  # Returns False
isTrueMinimumNumberOfTimes([True, True, left == right], 3)  # Returns False
```

:::
