# safeJSONParse <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Attempts to parse without returning an error, even if the argument value is of the wrong type or in `JSON` format. If parsing fails, it will be replaced with the object set in `fallback`. The default value for `fallback` is an empty object.

## Parameters

- `jsonString::any`
- `fallback::object`

## Returns

> object

## Examples

```javascript
const result1 = safeJSONParse('{"a":1,"b":2}');
const result2 = safeJSONParse(null);

console.log(result1); // Returns { a: 1, b: 2 }
console.log(result2); // Returns {}
```
