# objClone
Copies an object. The copy is deep by default, so nothing inside it is shared with the original; pass `deep: false` to copy the top level only.

A structure that points back at itself is handled: every container is remembered while it is being copied, so a cycle is rebuilt with the same shape instead of recursing until the stack runs out.

Values that are not containers are returned as they are, so `objClone(5)` is `5`.

## What is copied

Containers are rebuilt; anything that cannot be rebuilt without knowing how it was made is handed back as it is.

| | JavaScript | Dart | Python |
| --- | --- | --- | --- |
| Rebuilt, contents copied | plain object, `Array`, `Map`, `Set` | `Map`, `List`, `Set` | `dict`, `list`, `tuple` |
| Fresh copy | `Date`, `RegExp` | — | `set` (its members are immutable) |
| Handed back as it is | function, class instance | `DateTime` (immutable), class instance | `datetime` (immutable), class instance |

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'any', required: true, desc: 'The value to copy. A value that is not a container is returned as it is.' },
	{ name: 'options', type: 'CloneOptions', named: true, desc: 'Copy options. See the table below.' }
]" />

<ParamsTable name="CloneOptions" :rows="[
	{ name: 'deep', type: 'boolean', default: 'true', desc: 'Copy everything inside the value. When `false`, only the top level is copied and nested containers stay shared with the original.' }
]" />

## Returns

<ReturnType type="any" />

## Examples

::: lang js

```javascript
const source = { a: 1, b: { c: [1, 2] } };

const deep = objClone(source);
deep.b.c[0] = 99; // `source.b.c[0]` is still 1

const shallow = objClone(source, { deep: false });
shallow.b === source.b; // true, the nested object is shared

objClone([1, [2, 3]]); // Returns [1, [2, 3]]
objClone(5); // Returns 5
```

:::

::: lang dart

```dart
final source = {'a': 1, 'b': {'c': [1, 2]}};

final deep = objClone(source);
deep['b']['c'][0] = 99; // `source['b']['c'][0]` is still 1

final shallow = objClone(source, deep: false);
identical(shallow['b'], source['b']); // true, the nested map is shared

objClone([1, [2, 3]]); // Returns [1, [2, 3]]
objClone(5); // Returns 5
```

:::

::: lang python

```python
source = {'a': 1, 'b': {'c': [1, 2]}}

deep = objClone(source)
deep['b']['c'][0] = 99  # `source['b']['c'][0]` is still 1

shallow = objClone(source, {'deep': False})
shallow['b'] is source['b']  # True, the nested dict is shared

objClone([1, [2, 3]])  # Returns [1, [2, 3]]
objClone(5)  # Returns 5
```

:::
