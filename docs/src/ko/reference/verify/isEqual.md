# isEqual <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

It compares the first argument value as the left operand and the argument values given thereafter as the right operand, and returns `true` if the values are all the same.

`isEqual` returns `true` even if the data types do not match, but `isEqualStrict` returns `true` only when the data types of all argument values match.

## Parameters

- `leftOperand::any`
- `rightOperand::any||any[]||...any`

In Dart, rest parameters are not supported in `rightOperand`.

## Returns

> boolean

## Examples

```javascript
const val1 = 'Left';
const val2 = 1;

isEqual('Left', 'Left', val1); // Returns true
isEqual(1, [1, '1', 1, val2]); // Returns true
isEqual(val1, ['Right', 'Left', 1]); // Returns false
isEqual(1, 1, 1, 1); // Returns true
```
