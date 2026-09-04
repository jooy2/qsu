# safeParseInt
Any argument value will be attempted to be parsed as a Number type without returning an error. If parsing fails, it is replaced by the number set in `fallback`. The default value for `fallback` is `0`. You can specify `radix` (default is decimal: `10`) in the third argument.

## Parameters

<ParamsTable :rows="[
	{ name: 'value', type: 'any', required: true },
	{ name: 'fallback', type: 'number', named: true, default: '0' },
	{ name: 'radix', type: 'number', named: true, default: '10' }
]" />

## Returns

<ReturnType type="number" />

## Examples

::: lang js

```javascript
const result1 = safeParseInt('00010');
const result2 = safeParseInt('10.1234');
const result3 = safeParseInt(null, -1);

console.log(result1); // Returns 10
console.log(result2); // Returns 10
console.log(result3); // Returns -1
```

:::

::: lang dart

```dart
final result1 = safeParseInt('00010');
final result2 = safeParseInt('10.1234');
final result3 = safeParseInt(null, -1);

print(result1); // Returns 10
print(result2); // Returns 10
print(result3); // Returns -1
```

:::

::: lang python

```python
result1 = safeParseInt('00010')
result2 = safeParseInt('10.1234')
result3 = safeParseInt(None, -1)

print(result1)  # Returns 10
print(result2)  # Returns 10
print(result3)  # Returns -1
```

:::
