# arrIntersection <Lang dart js python />

Returns the values that are present in every one of the given arrays.

The result is unique and keeps the order of the first array, so `arrIntersection([2, 1, 2], [2])` returns `[2]`. Calling it with a single array is therefore the same as removing its duplicates, and calling it with no array at all returns an empty array.

Values are compared **by value**, not by reference, so nested arrays and objects are matched as well: `arrIntersection([[1], [2]], [[2], [3]])` returns `[[2]]`. Types are not coerced — `1` and `'1'` are different values.

In JavaScript and Python the arrays are passed as separate arguments; in Dart they are passed as a single list of lists.

## Parameters

<ParamsTable :rows="[
	{ name: 'arrays', type: 'any[][]', required: true, desc: 'The arrays to intersect. None of them is modified.' }
]" />

## Returns

> any[]

## Examples

::: code-group

```javascript [JavaScript]
arrIntersection([2, 1], [2, 3]); // Returns [2]
arrIntersection([1, 2, 3], [2, 3, 4], [3, 2]); // Returns [2, 3]
arrIntersection([2, 1, 2], [2]); // Returns [2]
arrIntersection([1, 2], [3]); // Returns []
arrIntersection([[1], [2]], [[2], [3]]); // Returns [[2]]
```

```dart [Dart]
arrIntersection([[2, 1], [2, 3]]); // Returns [2]
arrIntersection([[1, 2, 3], [2, 3, 4], [3, 2]]); // Returns [2, 3]
arrIntersection([[2, 1, 2], [2]]); // Returns [2]
arrIntersection([[1, 2], [3]]); // Returns []
arrIntersection([[[1], [2]], [[2], [3]]]); // Returns [[2]]
```

```python [Python]
arrIntersection([2, 1], [2, 3])  # Returns [2]
arrIntersection([1, 2, 3], [2, 3, 4], [3, 2])  # Returns [2, 3]
arrIntersection([2, 1, 2], [2])  # Returns [2]
arrIntersection([1, 2], [3])  # Returns []
arrIntersection([[1], [2]], [[2], [3]])  # Returns [[2]]
```

:::
