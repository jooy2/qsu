# arrGroupByMaxCount <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Separates the data in the given array into a two-dimensional array containing only the maximum number of elements. For example, if you have an array of 6 data in 2 groups, this function will create a 2-dimensional array with 3 lengths.

## Parameters

- `array::any[]`
- `maxLengthPerGroup::number`

## Returns

> any[]

## Examples

```javascript
arrGroupByMaxCount(['a', 'b', 'c', 'd', 'e'], 2);
// Returns [['a', 'b'], ['c', 'd'], ['e']]
```
