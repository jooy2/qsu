# objMapKeys
Returns a new object whose keys are the values returned by the callback. The values are carried over untouched.

The callback receives `(value, key)`, in that order, matching the rest of the ecosystem, and must return a string. Only the top level is inspected — the keys of a nested object are left alone.

When two keys map onto the same name, the later one wins. The original object is not modified, and `null` is returned when the first argument is not an object.

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true, desc: 'The object whose keys are mapped. It is not modified.' },
	{ name: 'iteratee', type: { js: 'function', dart: 'String Function(dynamic value, String key)' }, required: true, desc: 'Called as `(value, key)` for every entry. Its return value becomes the new key.' }
]" />

## Returns

<ReturnType type="object | null" />

## Examples

::: lang js

```javascript
objMapKeys({ a: 1, b: 2 }, (value, key) => key.toUpperCase()); // Returns { A: 1, B: 2 }
objMapKeys({ a: 1, b: 2 }, (value, key) => `${key}${value}`); // Returns { a1: 1, b2: 2 }
objMapKeys({ a: 1, b: 2 }, () => 'x'); // Returns { x: 2 }
```

:::

::: lang dart

```dart
objMapKeys({'a': 1, 'b': 2}, (value, key) => key.toUpperCase()); // Returns {'A': 1, 'B': 2}
objMapKeys({'a': 1, 'b': 2}, (value, key) => '$key$value'); // Returns {'a1': 1, 'b2': 2}
objMapKeys({'a': 1, 'b': 2}, (value, key) => 'x'); // Returns {'x': 2}
```

:::

::: lang python

```python
objMapKeys({'a': 1, 'b': 2}, lambda value, key: key.upper())  # Returns {'A': 1, 'B': 2}
objMapKeys({'a': 1, 'b': 2}, lambda value, key: f'{key}{value}')  # Returns {'a1': 1, 'b2': 2}
objMapKeys({'a': 1, 'b': 2}, lambda value, key: 'x')  # Returns {'x': 2}
```

:::
