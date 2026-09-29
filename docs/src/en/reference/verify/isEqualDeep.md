# isEqualDeep

Compares two values by their contents and returns `true` when they match all the way down. Arrays are equal when they have the same length and equal items in the same order. Objects are equal when they have the same keys and equal values under them, in any key order.

No value is converted to another type: `1` and `'1'` are different, and so are `true` and `1`. Numbers compare by value, so `1` equals `1.0`, `0` equals `-0` and `NaN` equals `NaN`. Dates are equal when they point to the same moment.

Any other value, such as a class instance, is compared with <Val js="===" dart="==" python="==" />. A structure that contains itself is compared without looping forever.

Unlike [isEqual](./isEqual), it takes exactly two values, and an array passed as the second one is a value to compare rather than a list of values.

::: lang js

`null` and `undefined` are different values. A plain object is one made with `{}` or `Object.create(null)`. A `Map`, a `Set` or a class instance counts as any other value, so two of them are equal only when they are the same instance.

:::

::: lang dart

Any `List` is compared as an array and any `Map` as an object. A `Set` counts as any other value and is compared with `==`, which for a set means the same instance.

:::

::: lang python

A `list` and a `tuple` with the same items are equal, and a subclass of `dict` is compared as a `dict`. A `set` counts as any other value and is compared with `==`.

:::

## Parameters

<ParamsTable :rows="[
	{ name: 'left', type: 'any', required: true },
	{ name: 'right', type: 'any', required: true }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
isEqualDeep({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }); // Returns true
isEqualDeep({ a: 1, b: 2 }, { b: 2, a: 1 }); // Returns true
isEqualDeep([1, 2], [2, 1]); // Returns false
isEqualDeep({ a: 1 }, { a: '1' }); // Returns false
isEqualDeep(NaN, NaN); // Returns true
```

:::

::: lang dart

```dart
isEqualDeep({'a': [1, {'b': 2}]}, {'a': [1, {'b': 2}]}); // Returns true
isEqualDeep({'a': 1, 'b': 2}, {'b': 2, 'a': 1}); // Returns true
isEqualDeep([1, 2], [2, 1]); // Returns false
isEqualDeep({'a': 1}, {'a': '1'}); // Returns false
isEqualDeep(double.nan, double.nan); // Returns true
```

:::

::: lang python

```python
isEqualDeep({'a': [1, {'b': 2}]}, {'a': [1, {'b': 2}]})  # Returns True
isEqualDeep({'a': 1, 'b': 2}, {'b': 2, 'a': 1})  # Returns True
isEqualDeep([1, 2], (1, 2))  # Returns True
isEqualDeep(True, 1)  # Returns False
isEqualDeep(float('nan'), float('nan'))  # Returns True
```

:::
