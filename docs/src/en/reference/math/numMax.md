# numMax

Returns the largest of the given numbers. Like [numSum](./numSum), it accepts either n arguments or a single array of numbers.

Values that are not numbers are skipped, as they are in `numSum`, and so is `NaN`, which would otherwise win by losing every comparison it takes part in.

::: lang js dart

When nothing is left to compare — an empty array, or no arguments at all — `null` is returned.

:::

::: lang python

When nothing is left to compare — an empty list, or no arguments at all — `None` is returned.

:::

## Parameters

<ParamsTable :rows="[
	{ name: 'numbers', type: '...number[]', required: true, desc: 'The numbers to compare, either as n arguments or as a single array.' }
]" />

## Returns

<ReturnType :type="{ js: 'number | null', dart: 'num?' }" />

## Examples

::: lang js

```javascript
numMax(1, 2, 3); // Returns 3
numMax([4, 2, 8, 6]); // Returns 8
numMax(-4, -2, -8); // Returns -2
numMax([]); // Returns null
```

:::

::: lang dart

```dart
numMax([1, 2, 3]); // Returns 3
numMax([4, 2, 8, 6]); // Returns 8
numMax([-4, -2, -8]); // Returns -2
numMax([]); // Returns null
```

:::

::: lang python

```python
numMax(1, 2, 3)  # Returns 3
numMax([4, 2, 8, 6])  # Returns 8
numMax(-4, -2, -8)  # Returns -2
numMax([])  # Returns None
```

:::
