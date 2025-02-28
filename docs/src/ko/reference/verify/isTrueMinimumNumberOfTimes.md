# isTrueMinimumNumberOfTimes <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

`conditions` 배열에 있는 값이 최소 `minimumCount` 번 참이면 `true`를 반환합니다.

## Parameters

- `conditions::boolean[]`
- `minimumCount::number` <span class="named">Dart:Named</span>

## Returns

> boolean

## Examples

```javascript
const left = 1;
const right = 1 + 2;

isTrueMinimumNumberOfTimes([true, true, false], 2); // Returns true
isTrueMinimumNumberOfTimes([true, true, false], 3); // Returns false
isTrueMinimumNumberOfTimes([true, true, left === right], 3); // Returns false
```
