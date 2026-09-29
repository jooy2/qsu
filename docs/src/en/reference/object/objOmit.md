# objOmit

Returns a new object without the listed keys. A single key or an array of keys is accepted. It is the opposite of [objPick](./objPick).

Only the top level is inspected, and a key the object does not have is ignored. Values are carried over as they are, so a nested object is shared with the source rather than copied — use [objClone](./objClone) if a copy is needed.

The original object is not modified. If the first argument is not an object, `null` is returned.

To drop keys by a test instead, invert the test and use [objPickBy](./objPickBy).

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true, desc: 'The object to read from. It is not modified.' },
	{ name: 'keys', type: 'string | string[]', required: true, desc: 'One key name, or an array of key names, to leave out.' }
]" />

## Returns

<ReturnType type="object | null" />

## Examples

::: lang js

```javascript
objOmit({ a: 1, b: 2, c: 3 }, ['a', 'c']); // Returns { b: 2 }
objOmit({ a: 1, b: 2 }, 'a'); // Returns { b: 2 }
objOmit({ a: 1 }, ['zzz']); // Returns { a: 1 }
```

:::

::: lang dart

```dart
objOmit({'a': 1, 'b': 2, 'c': 3}, ['a', 'c']); // Returns {'b': 2}
objOmit({'a': 1, 'b': 2}, 'a'); // Returns {'b': 2}
objOmit({'a': 1}, ['zzz']); // Returns {'a': 1}
```

:::

::: lang python

```python
objOmit({'a': 1, 'b': 2, 'c': 3}, ['a', 'c'])  # Returns {'b': 2}
objOmit({'a': 1, 'b': 2}, 'a')  # Returns {'b': 2}
objOmit({'a': 1}, ['zzz'])  # Returns {'a': 1}
```

:::
