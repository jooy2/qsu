# isTrueMinimumNumberOfTimes <Lang dart js />

Returns `true` if the values given in the `conditions` array are true at least `minimumCount` times.

## Parameters

- `conditions::boolean[]`
- `minimumCount::number` <span class="named">Dart:Named</span>

## Returns

> boolean

## Examples

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

:::
