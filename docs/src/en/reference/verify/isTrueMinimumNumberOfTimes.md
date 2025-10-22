# isTrueMinimumNumberOfTimes <Lang dart js />

Returns `true` if the values given in the `conditions` array are true at least `minimumCount` times.

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
