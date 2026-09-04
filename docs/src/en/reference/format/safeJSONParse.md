# safeJSONParse <Lang dart js python />

Attempts to parse without returning an error, even if the argument value is of the wrong type or in `JSON` format. If parsing fails, it will be replaced with the object set in `fallback`. The default value for `fallback` is an empty object.

## Parameters

<ParamsTable :rows="[
	{ name: 'jsonString', type: 'any', required: true },
	{ name: 'fallback', type: { js: 'object', dart: 'dynamic' }, named: true, default: '{}' }
]" />

## Returns

<ReturnType :type="{ js: 'object', dart: 'dynamic' }" />

## Examples

::: lang js

```javascript
const result1 = safeJSONParse('{"a":1,"b":2}');
const result2 = safeJSONParse(null);

console.log(result1); // Returns { a: 1, b: 2 }
console.log(result2); // Returns {}
```

:::

::: lang dart

```dart
final result1 = safeJSONParse('{"a":1,"b":2}');
final result2 = safeJSONParse(null);

print(result1); // Returns { a: 1, b: 2 }
print(result2); // Returns {}
```

:::

::: lang python

```python
result1 = safeJSONParse('{"a":1,"b":2}')
result2 = safeJSONParse(None)

print(result1)  # Returns { a: 1, b: 2 }
print(result2)  # Returns {}
```

:::
