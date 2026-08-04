# objPickBy <Lang dart js python />

Returns a new object containing only the entries for which the callback returns `true`.

The callback receives `(value, key)`, in that order, matching the rest of the ecosystem. Only the top level is inspected — a nested object is carried over as it is, never filtered.

The original object is not modified. If the first argument is not an object, `null` is returned.

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true, desc: 'The object to filter. It is not modified.' },
	{ name: 'predicate', type: 'function', required: true, desc: 'Called as `(value, key)` for every entry. The entry is kept when it returns `true`.' }
]" />

## Returns

> object | null

## Examples

::: code-group

```javascript [JavaScript]
objPickBy({ a: 1, b: 2, c: 3 }, (value) => value > 1); // Returns { b: 2, c: 3 }
objPickBy({ a: 1, b: 2 }, (value, key) => key === 'a'); // Returns { a: 1 }
objPickBy({ a: null, b: 1 }, (value) => value !== null); // Returns { b: 1 }
objPickBy({ a: 1 }, () => false); // Returns {}
```

```dart [Dart]
objPickBy({'a': 1, 'b': 2, 'c': 3}, (value, key) => value > 1); // Returns {'b': 2, 'c': 3}
objPickBy({'a': 1, 'b': 2}, (value, key) => key == 'a'); // Returns {'a': 1}
objPickBy({'a': null, 'b': 1}, (value, key) => value != null); // Returns {'b': 1}
objPickBy({'a': 1}, (value, key) => false); // Returns {}
```

```python [Python]
objPickBy({'a': 1, 'b': 2, 'c': 3}, lambda value, key: value > 1)  # Returns {'b': 2, 'c': 3}
objPickBy({'a': 1, 'b': 2}, lambda value, key: key == 'a')  # Returns {'a': 1}
objPickBy({'a': None, 'b': 1}, lambda value, key: value is not None)  # Returns {'b': 1}
objPickBy({'a': 1}, lambda value, key: False)  # Returns {}
```

:::
