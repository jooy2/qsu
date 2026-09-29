# arrUnique

Returns a new array with duplicate values removed, keeping the first of each in its original place.

Values are compared **by value**, not by reference, the way [arrDifference](./arrDifference) and [arrIntersection](./arrIntersection) compare them. Nested arrays and objects with the same contents are duplicates, and the item kept is the original one, not a copy. Types are not coerced, so `1` and `'1'` are different values, while `1` and `1.0` are the same number.

Objects are compared through their JSON form, so two objects with the same keys in a different order are different values.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true }
]" />

## Returns

<ReturnType type="any[]" />

## Examples

::: lang js

```javascript
arrUnique([1, 2, 2, 3]); // Returns [1, 2, 3]
arrUnique([[1], [1], [2]]); // Returns [[1], [2]]
arrUnique([{ a: 1 }, { a: 1 }, { a: 2 }]); // Returns [{ a: 1 }, { a: 2 }]
arrUnique([1, '1', 1.0]); // Returns [1, '1']
```

:::

::: lang dart

```dart
arrUnique([1, 2, 2, 3]); // Returns [1, 2, 3]
arrUnique([[1], [1], [2]]); // Returns [[1], [2]]
arrUnique([{'a': 1}, {'a': 1}, {'a': 2}]); // Returns [{'a': 1}, {'a': 2}]
arrUnique([1, '1', 1.0]); // Returns [1, '1']
```

:::

::: lang python

```python
arrUnique([1, 2, 2, 3])  # Returns [1, 2, 3]
arrUnique([[1], [1], [2]])  # Returns [[1], [2]]
arrUnique([{'a': 1}, {'a': 1}, {'a': 2}])  # Returns [{'a': 1}, {'a': 2}]
arrUnique([1, '1', 1.0])  # Returns [1, '1']
```

:::
