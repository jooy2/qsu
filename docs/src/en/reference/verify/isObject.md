# isObject <Lang dart js python />

Check whether the given data is of type `Object`. Returns `false` for other data types including `Array`.

## Parameters

<ParamsTable :rows="[
	{ name: 'data', type: 'any', required: true }
]" />

## Returns

> boolean

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
