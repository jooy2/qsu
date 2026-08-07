# max <Lang js dart python />

Returns the largest of the given numbers. Like [sum](./sum), it accepts either n arguments or a single array of numbers.

Values that are not numbers are skipped, as they are in `sum`, and so is `NaN`, which would otherwise win by losing every comparison it takes part in. When nothing is left to compare — an empty array, or no arguments at all — `null` is returned (`None` in Python).

## Parameters

<ParamsTable :rows="[
	{ name: 'numbers', type: '...number[]', required: true, desc: 'The numbers to compare, either as n arguments or as a single array.' }
]" />

## Returns

> number | null

## Examples

::: code-group

```javascript [JavaScript]
max(1, 2, 3); // Returns 3
max([4, 2, 8, 6]); // Returns 8
max(-4, -2, -8); // Returns -2
max([]); // Returns null
```

```dart [Dart]
max([1, 2, 3]); // Returns 3
max([4, 2, 8, 6]); // Returns 8
max([-4, -2, -8]); // Returns -2
max([]); // Returns null
```

```python [Python]
max(1, 2, 3)  # Returns 3
max([4, 2, 8, 6])  # Returns 8
max(-4, -2, -8)  # Returns -2
max([])  # Returns None
```

:::
