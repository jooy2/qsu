# objInvert
Returns a new object with the keys and values swapped: every value becomes a key, and the key it came from becomes its value.

Keys are always strings, so the value is converted to text first. `null` becomes `'null'`, `true` becomes `'true'`, and a number that happens to be whole is written without a fractional part in every language, so `1.0` becomes `'1'` in Dart and Python just as it does in JavaScript.

Only the top level is inspected, and when two entries share a value the later one wins, because both land on the same key. Values that are not a string, a number, a boolean or `null` have no meaningful text form — the result for those is whatever the language prints and is not part of the API.

The original object is not modified. If the argument is not an object, `null` is returned.

One note on iteration order: a JavaScript object always enumerates integer-like keys first, so `objInvert({ a: 'x', b: 1 })` iterates `1` before `x` there while Dart and Python keep the insertion order. The entries themselves are identical in all three.

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true, desc: 'The object to invert. It is not modified.' }
]" />

## Returns

<ReturnType :type="{ js: 'object | null', dart: 'Map<String, String>?' }" />

## Examples

::: lang js

```javascript
objInvert({ a: 1, b: 2 }); // Returns { '1': 'a', '2': 'b' }
objInvert({ a: 'x', b: 'y' }); // Returns { x: 'a', y: 'b' }
objInvert({ a: 1, b: 1 }); // Returns { '1': 'b' }
objInvert({ a: true, b: null }); // Returns { true: 'a', null: 'b' }
```

:::

::: lang dart

```dart
objInvert({'a': 1, 'b': 2}); // Returns {'1': 'a', '2': 'b'}
objInvert({'a': 'x', 'b': 'y'}); // Returns {'x': 'a', 'y': 'b'}
objInvert({'a': 1, 'b': 1}); // Returns {'1': 'b'}
objInvert({'a': true, 'b': null}); // Returns {'true': 'a', 'null': 'b'}
```

:::

::: lang python

```python
objInvert({'a': 1, 'b': 2})  # Returns {'1': 'a', '2': 'b'}
objInvert({'a': 'x', 'b': 'y'})  # Returns {'x': 'a', 'y': 'b'}
objInvert({'a': 1, 'b': 1})  # Returns {'1': 'b'}
objInvert({'a': True, 'b': None})  # Returns {'true': 'a', 'null': 'b'}
```

:::
