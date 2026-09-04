# objGet <Lang js dart python />

Reads a nested value out of an object by path, returning a `fallback` when the path is not there.

The path takes both dot and bracket notation, and the two can be mixed: `a.b.c`, `list[0]`, `list[1].d` and `list.1.d` all work. A bracket may carry a quoted key, so `["a.b"]` reads one key named `a.b` instead of walking two levels.

Whether a step exists is decided by the presence of the key, not by the value behind it, so a stored `null` is returned as it is rather than replaced by the fallback.

Arrays are walked with their numeric index. The fallback is returned as soon as a step is missing, when the path runs into a value that cannot be walked any further, or when the object itself is not an object.

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true, desc: 'The object to read from.' },
	{ name: 'path', type: 'string', required: true, desc: 'The path to the value, in dot and/or bracket notation.' },
	{ name: 'options', type: 'ObjGetOptions', named: true, desc: 'Lookup options. See the table below.' }
]" />

<ParamsTable name="ObjGetOptions" :rows="[
	{ name: 'fallback', type: 'any', default: 'null', desc: 'Returned when the path is not there. `None` in Python.' }
]" />

## Returns

<ReturnType type="any" />

## Examples

::: lang js

```javascript
const data = { a: { b: { c: 42 } }, list: [1, { d: 'x' }] };

objGet(data, 'a.b.c'); // Returns 42
objGet(data, 'list[0]'); // Returns 1
objGet(data, 'list[1].d'); // Returns 'x'
objGet(data, 'a.zzz'); // Returns null
objGet(data, 'a.zzz', { fallback: 'none' }); // Returns 'none'
objGet({ 'a.b': 1 }, '["a.b"]'); // Returns 1
```

:::

::: lang dart

```dart
final data = {'a': {'b': {'c': 42}}, 'list': [1, {'d': 'x'}]};

objGet(data, 'a.b.c'); // Returns 42
objGet(data, 'list[0]'); // Returns 1
objGet(data, 'list[1].d'); // Returns 'x'
objGet(data, 'a.zzz'); // Returns null
objGet(data, 'a.zzz', fallback: 'none'); // Returns 'none'
objGet({'a.b': 1}, '["a.b"]'); // Returns 1
```

:::

::: lang python

```python
data = {'a': {'b': {'c': 42}}, 'list': [1, {'d': 'x'}]}

objGet(data, 'a.b.c')  # Returns 42
objGet(data, 'list[0]')  # Returns 1
objGet(data, 'list[1].d')  # Returns 'x'
objGet(data, 'a.zzz')  # Returns None
objGet(data, 'a.zzz', {'fallback': 'none'})  # Returns 'none'
objGet({'a.b': 1}, '["a.b"]')  # Returns 1
```

:::
