# isEqualLoose

It compares the first argument value as the left operand and the argument values given thereafter as the right operand, and returns `true` if the values are all the same.

`isEqualLoose` returns `true` even if the data types do not match, but `isEqualStrict` returns `true` only when the data types of all argument values match.

Passing an array as the second argument is treated as "the right operands were given as a list". Any other object is compared as a value, using the host language's own equality rules: JavaScript and Dart compare objects by reference, so two objects with identical contents are **not** equal, while Python compares `dict` contents, so they **are** equal.

To compare arrays and objects by their contents in every language, use [isEqualDeep](./isEqualDeep).

## Parameters

<ParamsTable :rows="[
	{ name: 'leftOperand', type: 'any', required: true },
	{ name: 'rightOperand', type: 'any | any[] | ...any', required: true }
]" />

::: lang dart

`rightOperand` is not a rest parameter. Pass one or two values, or a single list.

:::

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
const val1 = 'Left';
const val2 = 1;

isEqualLoose('Left', 'Left', val1); // Returns true
isEqualLoose(1, [1, '1', 1, val2]); // Returns true
isEqualLoose(val1, ['Right', 'Left', 1]); // Returns false
isEqualLoose(1, 1, 1, 1); // Returns true
```

:::

::: lang dart

```dart
final String val1 = 'Left';
final int val2 = 1;

isEqualLoose('Left', 'Left'); // Returns true
isEqualLoose(1, [1, '1', 1, val2]); // Returns true
isEqualLoose(val1, ['Right', 'Left', 1]); // Returns false
isEqualLoose(1, 1); // Returns true
```

:::

::: lang python

```python
val1 = 'Left'
val2 = 1

isEqualLoose('Left', 'Left', val1)  # Returns True
isEqualLoose(1, [1, '1', 1, val2])  # Returns True
isEqualLoose(val1, ['Right', 'Left', 1])  # Returns False
isEqualLoose(1, 1, 1, 1)  # Returns True
```

:::
