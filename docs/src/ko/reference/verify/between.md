# between <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Returns `true` if the first argument is in the range of the second argument (`[min, max]`). To allow the minimum and maximum values to be in the range, pass `true` for the third argument.

## Parameters

- `range::[number, number]`
- `number::number`
- `inclusive::boolean || false` <span class="named">Dart:Named</span>

## Returns

> boolean

## Examples

```javascript
between([10, 20], 10); // Returns false
between([10, 20], 10, true); // Returns true
```
