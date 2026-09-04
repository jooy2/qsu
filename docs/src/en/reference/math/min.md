# min <Lang js dart python />

Returns the smallest of the given numbers. Like [sum](./sum), it accepts either n arguments or a single array of numbers.

Values that are not numbers are skipped, as they are in `sum`, and so is `NaN`, which would otherwise win by losing every comparison it takes part in. When nothing is left to compare — an empty array, or no arguments at all — `null` is returned (`None` in Python).

## Parameters

<ParamsTable :rows="[
	{ name: 'numbers', type: '...number[]', required: true, desc: 'The numbers to compare, either as n arguments or as a single array.' }
]" />

## Returns

<ReturnType :type="{ js: 'number | null', dart: 'num?' }" />

## Examples

::: lang js

```javascript
min(1, 2, 3); // Returns 1
min([4, 2, 8, 6]); // Returns 2
min(-4, -2, -8); // Returns -8
min([]); // Returns null
```

:::

::: lang dart

```dart
min([1, 2, 3]); // Returns 1
min([4, 2, 8, 6]); // Returns 2
min([-4, -2, -8]); // Returns -8
min([]); // Returns null
```

:::

::: lang python

```python
min(1, 2, 3)  # Returns 1
min([4, 2, 8, 6])  # Returns 2
min(-4, -2, -8)  # Returns -8
min([])  # Returns None
```

:::
