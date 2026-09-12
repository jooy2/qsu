# sortNumeric
When sorting an array consisting of strings, it sorts first by the numbers contained in the strings, not by their names. For example, given the array `['1-a', '100-a', '10-a', '2-a']`, it returns `['1-a', '2-a', '10-a', '100-a']` with the smaller numbers at the front.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'string[]', required: true },
	{ name: 'descending', type: 'boolean', default: 'false', named: true }
]" />

## Ordering

A string is cut into runs of digits and runs of everything else, and the runs are compared in three passes over the whole string: the letters first, then the accents on them, then upper against lower case. Because case is only reached once the letters and the numbers are equal, `item1` comes before `Item10`, where comparing character by character would put `Item10` first.

Within a pass, whitespace sorts before punctuation and symbols, those before numbers, and numbers before letters, so `.gitignore` comes before `1file`. A run of digits is compared by its length before its digits, so a number longer than the language can hold in a number type still sorts correctly.

The result is identical in all three packages and does not depend on the locale of the machine.

## Returns

<ReturnType type="string[]" />

## Examples

::: lang js

```javascript
sortNumeric(['a1a', 'b2a', 'aa1a', '1', 'a11a', 'a3a', 'a2a', '1a']);
// Returns ['1', '1a', 'a1a', 'a2a', 'a3a', 'a11a', 'aa1a', 'b2a']
```

:::

::: lang dart

```dart
sortNumeric(['a1a', 'b2a', 'aa1a', '1', 'a11a', 'a3a', 'a2a', '1a']);
// Returns ['1', '1a', 'a1a', 'a2a', 'a3a', 'a11a', 'aa1a', 'b2a']
```

:::

::: lang python

```python
sortNumeric(['a1a', 'b2a', 'aa1a', '1', 'a11a', 'a3a', 'a2a', '1a'])
# Returns ['1', '1a', 'a1a', 'a2a', 'a3a', 'a11a', 'aa1a', 'b2a']
```

:::
