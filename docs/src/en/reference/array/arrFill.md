# arrFill

Initialize an array with a default value of a specific length.

## Parameters

<ParamsTable :rows="[
	{ name: 'value', type: 'any', required: true },
	{ name: 'length', type: 'number', default: '0' }
]" />

## Returns

<ReturnType type="any[]" />

## Examples

::: lang js

```javascript
arrFill('abc', 4); // Returns ['abc', 'abc', 'abc', 'abc']
arrFill(null, 3); // Returns [null, null, null]
```

:::

::: lang dart

```dart
arrFill('abc', 4); // Returns ['abc', 'abc', 'abc', 'abc']
arrFill(null, 3); // Returns [null, null, null]
```

:::

::: lang python

```python
arrFill('abc', 4)  # Returns ['abc', 'abc', 'abc', 'abc']
arrFill(None, 3)  # Returns [None, None, None]
```

:::
