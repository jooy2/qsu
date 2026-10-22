# arrChunk

Separates the data in the given array into a two-dimensional array containing only the maximum number of elements. For example, if you have an array of 6 data in 2 groups, this function will create a 2-dimensional array with 3 lengths.

To group items by a key the callback returns instead, use [arrGroupBy](./arrGroupBy).

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true },
	{ name: 'size', type: 'number', default: '1' }
]" />

## Returns

<ReturnType type="any[]" />

## Examples

::: lang js

```javascript
arrChunk(['a', 'b', 'c', 'd', 'e'], 2);
// Returns [['a', 'b'], ['c', 'd'], ['e']]
```

:::

::: lang dart

```dart
arrChunk(['a', 'b', 'c', 'd', 'e'], 2);
// Returns [['a', 'b'], ['c', 'd'], ['e']]
```

:::

::: lang python

```python
arrChunk(['a', 'b', 'c', 'd', 'e'], 2)
# Returns [['a', 'b'], ['c', 'd'], ['e']]
```

:::
