# objSet

Returns a copy of an object with a value written at a path, creating the levels that are missing on the way. It is the writing counterpart of [objGet](./objGet) and reads the path the same way: `a.b.c`, `list[0]`, `list[1].d` and `["a.b"]` all work.

The original object is not modified. Every object and array along the path is copied, and everything off the path is shared with the source.

A step that is missing, or that holds something other than an object or an array, is replaced by a new empty object. That includes a numeric step such as `[0]`: a missing level is always an object, never an array.

On an array, a step must be an index the array already has, or its length, which appends. Any other step throws a <Val js="RangeError" dart="RangeError" python="IndexError" />.

If the first argument is not an object, `null` is returned.

[objUpdate](./objUpdate) does a different job: it replaces a key found by its name, optionally at any depth. Use `objSet` when you know where the value goes.

::: lang js

Only the object's own properties are followed, so `constructor` or `toString` on the path count as missing. A key named `__proto__` is written as an ordinary key and never replaces a prototype.

:::

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true, desc: 'The object to copy. It is not modified.' },
	{ name: 'path', type: 'string', required: true, desc: 'Where to write the value, in dot and/or bracket notation.' },
	{ name: 'value', type: 'any', required: true, desc: 'The value to write.' }
]" />

## Returns

<ReturnType type="object | null" />

## Examples

::: lang js

```javascript
const data = { a: { b: 1 }, list: [{ x: 1 }, { x: 2 }] };

objSet(data, 'a.b', 2); // Returns { a: { b: 2 }, list: [{ x: 1 }, { x: 2 }] }
objSet(data, 'list[1].x', 9); // Returns { a: { b: 1 }, list: [{ x: 1 }, { x: 9 }] }
objSet(data, 'list[2]', { x: 3 }); // Returns { a: { b: 1 }, list: [{ x: 1 }, { x: 2 }, { x: 3 }] }
objSet({}, 'a.b.c', 1); // Returns { a: { b: { c: 1 } } }
objSet({}, 'a[0]', 1); // Returns { a: { '0': 1 } }
```

:::

::: lang dart

```dart
final data = {
  'a': {'b': 1},
  'list': [{'x': 1}, {'x': 2}],
};

objSet(data, 'a.b', 2); // Returns {'a': {'b': 2}, 'list': [{'x': 1}, {'x': 2}]}
objSet(data, 'list[1].x', 9); // Returns {'a': {'b': 1}, 'list': [{'x': 1}, {'x': 9}]}
objSet(data, 'list[2]', {'x': 3}); // Returns {'a': {'b': 1}, 'list': [{'x': 1}, {'x': 2}, {'x': 3}]}
objSet({}, 'a.b.c', 1); // Returns {'a': {'b': {'c': 1}}}
objSet({}, 'a[0]', 1); // Returns {'a': {'0': 1}}
```

:::

::: lang python

```python
data = {'a': {'b': 1}, 'list': [{'x': 1}, {'x': 2}]}

objSet(data, 'a.b', 2)  # Returns {'a': {'b': 2}, 'list': [{'x': 1}, {'x': 2}]}
objSet(data, 'list[1].x', 9)  # Returns {'a': {'b': 1}, 'list': [{'x': 1}, {'x': 9}]}
objSet(data, 'list[2]', {'x': 3})  # Returns {'a': {'b': 1}, 'list': [{'x': 1}, {'x': 2}, {'x': 3}]}
objSet({}, 'a.b.c', 1)  # Returns {'a': {'b': {'c': 1}}}
objSet({}, 'a[0]', 1)  # Returns {'a': {'0': 1}}
```

:::
