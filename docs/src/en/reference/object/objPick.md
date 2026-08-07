# objPick <Lang js dart python />

Returns a new object containing only the listed keys. A single key or an array of keys is accepted.

Only the top level is inspected, and a key that the object does not have is skipped rather than carried over as an empty value, so the result never claims a key the source never had. Values are carried over as they are, so a nested object is shared with the source rather than copied — use [objClone](./objClone) if a copy is needed.

The original object is not modified. If the first argument is not an object, `null` is returned.

For the predicate form, use [objPickBy](./objPickBy).

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true, desc: 'The object to read from. It is not modified.' },
	{ name: 'keys', type: 'string | string[]', required: true, desc: 'One key name, or an array of key names, to keep.' }
]" />

## Returns

> object | null

## Examples

::: code-group

```javascript [JavaScript]
objPick({ a: 1, b: 2, c: 3 }, ['a', 'c']); // Returns { a: 1, c: 3 }
objPick({ a: 1, b: 2 }, 'a'); // Returns { a: 1 }
objPick({ a: 1 }, ['a', 'zzz']); // Returns { a: 1 }
objPick({ a: 1, b: 2 }, []); // Returns {}
```

```dart [Dart]
objPick({'a': 1, 'b': 2, 'c': 3}, ['a', 'c']); // Returns {'a': 1, 'c': 3}
objPick({'a': 1, 'b': 2}, 'a'); // Returns {'a': 1}
objPick({'a': 1}, ['a', 'zzz']); // Returns {'a': 1}
objPick({'a': 1, 'b': 2}, []); // Returns {}
```

```python [Python]
objPick({'a': 1, 'b': 2, 'c': 3}, ['a', 'c'])  # Returns {'a': 1, 'c': 3}
objPick({'a': 1, 'b': 2}, 'a')  # Returns {'a': 1}
objPick({'a': 1}, ['a', 'zzz'])  # Returns {'a': 1}
objPick({'a': 1, 'b': 2}, [])  # Returns {}
```

:::
