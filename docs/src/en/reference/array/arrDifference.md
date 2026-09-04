# arrDifference <Lang dart js python />

Returns the values of the first array that are not contained in any of the other arrays.

The original order is preserved and duplicates of a kept value are not removed, so `arrDifference([2, 1, 2, 3], [1])` returns `[2, 2, 3]`.

Values are compared **by value**, not by reference, so nested arrays and objects are matched as well: `arrDifference([[1], [2]], [[1]])` returns `[[2]]`. Types are not coerced — `1` and `'1'` are different values.

In JavaScript and Python the arrays to subtract are passed as additional arguments; in Dart they are passed as a single list of lists.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true, desc: 'The array to inspect. It is not modified.' },
	{ name: 'others', type: 'any[][]', desc: 'The arrays whose values are excluded. Omit them to get a copy of `array`.' }
]" />

## Returns

> any[]

## Examples

::: lang js

```javascript
arrDifference([2, 1, 3], [2, 3]); // Returns [1]
arrDifference([2, 1, 2, 3], [1]); // Returns [2, 2, 3]
arrDifference([1, 2, 3, 4], [2], [4]); // Returns [1, 3]
arrDifference([[1], [2]], [[1]]); // Returns [[2]]
arrDifference([1, '1'], [1]); // Returns ['1']
```

:::

::: lang dart

```dart
arrDifference([2, 1, 3], [[2, 3]]); // Returns [1]
arrDifference([2, 1, 2, 3], [[1]]); // Returns [2, 2, 3]
arrDifference([1, 2, 3, 4], [[2], [4]]); // Returns [1, 3]
arrDifference([[1], [2]], [[[1]]]); // Returns [[2]]
arrDifference([1, '1'], [[1]]); // Returns ['1']
```

:::

::: lang python

```python
arrDifference([2, 1, 3], [2, 3])  # Returns [1]
arrDifference([2, 1, 2, 3], [1])  # Returns [2, 2, 3]
arrDifference([1, 2, 3, 4], [2], [4])  # Returns [1, 3]
arrDifference([[1], [2]], [[1]])  # Returns [[2]]
arrDifference([1, '1'], [1])  # Returns ['1']
```

:::
