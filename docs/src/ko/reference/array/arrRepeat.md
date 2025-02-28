# arrRepeat <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Repeats the data of an `Array` or `Object` a specific number of times and returns it as a 1d array.

## Parameters

- `array::any[]|object`
- `count::number`

## Returns

> any[]

## Examples

```javascript
arrRepeat([1, 2, 3, 4], 3); // Returns [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
arrRepeat({ a: 1, b: 2 }, 2); // Returns [{ a: 1, b: 2 }, { a: 1, b: 2 }]
```
