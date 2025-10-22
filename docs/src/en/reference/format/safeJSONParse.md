# safeJSONParse <Lang dart js />

Attempts to parse without returning an error, even if the argument value is of the wrong type or in `JSON` format. If parsing fails, it will be replaced with the object set in `fallback`. The default value for `fallback` is an empty object.

## Parameters

- `jsonString::any`
- `fallback::object`

## Returns

> object

## Examples

::: code-group

```javascript [JavaScript]
const result1 = safeJSONParse('{"a":1,"b":2}');
const result2 = safeJSONParse(null);

console.log(result1); // Returns { a: 1, b: 2 }
console.log(result2); // Returns {}
```

```dart [Dart]
final result1 = safeJSONParse('{"a":1,"b":2}');
final result2 = safeJSONParse(null);

print(result1); // Returns { a: 1, b: 2 }
print(result2); // Returns {}
```

:::
