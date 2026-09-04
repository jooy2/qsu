# arrCompact <Lang dart js python />

Returns a new array with every falsy value removed.

Dart and Python have no truthiness of their own, so the rejected set is fixed rather than left to each language: `null` (`undefined` as well in JavaScript, `None` in Python), `false`, `0` (including `-0` and `0.0`), the empty string `''` and `NaN`. Everything else is kept — an empty array, an empty object and a string of spaces are all preserved.

If the argument is not an array, an empty array is returned.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true, desc: 'The array to compact. The original array is not modified.' }
]" />

## Returns

<ReturnType type="any[]" />

## Examples

::: lang js

```javascript
arrCompact([0, 1, false, 2, '', 3, null, undefined, NaN]); // Returns [1, 2, 3]
arrCompact([false, 0, '', null]); // Returns []
arrCompact([[], {}, ' ', '0']); // Returns [[], {}, ' ', '0']
arrCompact([true, -1, 0.5]); // Returns [true, -1, 0.5]
```

:::

::: lang dart

```dart
arrCompact([0, 1, false, 2, '', 3, null, double.nan]); // Returns [1, 2, 3]
arrCompact([false, 0, '', null]); // Returns []
arrCompact([[], {}, ' ', '0']); // Returns [[], {}, ' ', '0']
arrCompact([true, -1, 0.5]); // Returns [true, -1, 0.5]
```

:::

::: lang python

```python
arrCompact([0, 1, False, 2, '', 3, None, float('nan')])  # Returns [1, 2, 3]
arrCompact([False, 0, '', None])  # Returns []
arrCompact([[], {}, ' ', '0'])  # Returns [[], {}, ' ', '0']
arrCompact([True, -1, 0.5])  # Returns [True, -1, 0.5]
```

:::
