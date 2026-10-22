# isPlainObject

Returns `true` when the given value is an object, and `false` for every other type, an array included.

## Parameters

<ParamsTable :rows="[
	{ name: 'data', type: 'any', required: true }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
isPlainObject([1, 2, 3]); // Returns false
isPlainObject({ a: 1, b: 2 }); // Returns true
```

:::

::: lang dart

```dart
isPlainObject([1, 2, 3]); // Returns false
isPlainObject({ 'a': 1, 'b': 2 }); // Returns true
```

:::

::: lang python

```python
isPlainObject([1, 2, 3])  # Returns False
isPlainObject({'a': 1, 'b': 2})  # Returns True
```

:::
