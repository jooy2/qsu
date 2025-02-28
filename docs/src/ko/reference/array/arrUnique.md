# arrUnique <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Remove duplicate values from array and two-dimensional array data. In the case of 2d arrays, json type data duplication is not removed.

## Parameters

- `array::any[]`

## Returns

> any[]

## Examples

```javascript
arrUnique([1, 2, 2, 3]); // Returns [1, 2, 3]
arrUnique([[1], [1], [2]]); // Returns [[1], [2]]
```
