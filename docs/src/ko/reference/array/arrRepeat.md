# arrRepeat <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

`Array` 또는 `Object`의 데이터를 특정 횟수만큼 반복하고 1차원 배열로 반환합니다.

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
