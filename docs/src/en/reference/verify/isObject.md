# isObject
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
isObject([1, 2, 3]); // Returns false
isObject({ a: 1, b: 2 }); // Returns true
```

:::

::: lang dart

```dart
isObject([1, 2, 3]); // Returns false
isObject({ 'a': 1, 'b': 2 }); // Returns true
```

:::

::: lang python

```python
isObject([1, 2, 3])  # Returns False
isObject({'a': 1, 'b': 2})  # Returns True
```

:::
