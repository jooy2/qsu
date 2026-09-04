# objMerge <Lang js dart python />

Merges any number of objects into one new object, going down through nested objects. When two sources carry the same key, the later one wins.

Two plain objects under the same key are merged into a **new** object, so neither source ends up shared with the result and neither is modified. Anything else — including arrays — is replaced whole by the later value. Lodash merges arrays index by index instead, which quietly keeps elements the caller meant to drop, so `objMerge({ a: [1, 2, 3] }, { a: [9] })` returns `{ a: [9] }` here and `{ a: [9, 2, 3] }` in Lodash.

A key that only one source carries is copied over as it is, so a nested object under such a key is shared with that source, exactly like the JavaScript spread. Use [objClone](./objClone) when a fully independent copy is needed.

`null` is returned when no argument is given, or when any argument is not an object.

[objMergeNewKey](./objMergeNewKey) is the narrower relative: it only adds keys that are missing and never overwrites an existing value.

## Parameters

<ParamsTable :rows="[
	{ name: 'objects', type: { js: '...object[]', dart: 'List<Map<String, dynamic>?>' }, required: true, desc: { js: 'The objects to merge, in order. Later objects win. They are passed as separate arguments.', dart: 'The objects to merge, in order. Later objects win. They are passed as a single list.' } }
]" />

## Returns

<ReturnType type="object | null" />

## Examples

::: lang js

```javascript
objMerge({ a: 1 }, { b: 2 }); // Returns { a: 1, b: 2 }
objMerge({ a: 1 }, { a: 2 }, { a: 3 }); // Returns { a: 3 }
objMerge({ a: { b: 1, c: 2 } }, { a: { c: 9, d: 3 } }); // Returns { a: { b: 1, c: 9, d: 3 } }
objMerge({ a: [1, 2, 3] }, { a: [9] }); // Returns { a: [9] }
objMerge({ a: 1 }, null); // Returns null
```

:::

::: lang dart

```dart
objMerge([{'a': 1}, {'b': 2}]); // Returns {'a': 1, 'b': 2}
objMerge([{'a': 1}, {'a': 2}, {'a': 3}]); // Returns {'a': 3}
objMerge([{'a': {'b': 1, 'c': 2}}, {'a': {'c': 9, 'd': 3}}]); // Returns {'a': {'b': 1, 'c': 9, 'd': 3}}
objMerge([{'a': [1, 2, 3]}, {'a': [9]}]); // Returns {'a': [9]}
objMerge([{'a': 1}, null]); // Returns null
```

:::

::: lang python

```python
objMerge({'a': 1}, {'b': 2})  # Returns {'a': 1, 'b': 2}
objMerge({'a': 1}, {'a': 2}, {'a': 3})  # Returns {'a': 3}
objMerge({'a': {'b': 1, 'c': 2}}, {'a': {'c': 9, 'd': 3}})  # Returns {'a': {'b': 1, 'c': 9, 'd': 3}}
objMerge({'a': [1, 2, 3]}, {'a': [9]})  # Returns {'a': [9]}
objMerge({'a': 1}, None)  # Returns None
```

:::
