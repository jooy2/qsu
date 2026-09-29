# arrWithNumber

Returns an array of the numbers from `start` to `end`, counting up by `step`. Both ends are included when a step lands on them: counting from `0` to `10` by `5` gives `[0, 5, 10]`, while counting by `3` stops at `9`.

`step` is a whole number of at least `1`, so the numbers always go up. Reverse the result to count down.

A <Val js="RangeError" dart="ArgumentError" python="ValueError" /> is thrown when `start` is greater than `end`, or when `step` is not a whole number of at least `1`.

## Parameters

<ParamsTable :rows="[
	{ name: 'start', type: 'number', required: true, desc: 'The first number.' },
	{ name: 'end', type: 'number', required: true, desc: 'The last number the result may contain. It must not be less than `start`.' },
	{ name: 'options', type: 'ArrWithNumberOptions', named: true, desc: 'See the table below.' }
]" />

<ParamsTable name="ArrWithNumberOptions" :rows="[
	{ name: 'step', type: 'number', default: '1', desc: 'The distance between two numbers. A whole number of at least `1`.' }
]" />

## Returns

<ReturnType type="number[]" />

## Examples

::: lang js

```javascript
arrWithNumber(1, 3); // Returns [1, 2, 3]
arrWithNumber(0, 3); // Returns [0, 1, 2, 3]
arrWithNumber(0, 10, { step: 5 }); // Returns [0, 5, 10]
arrWithNumber(0, 10, { step: 3 }); // Returns [0, 3, 6, 9]
```

:::

::: lang dart

```dart
arrWithNumber(1, 3); // Returns [1, 2, 3]
arrWithNumber(0, 3); // Returns [0, 1, 2, 3]
arrWithNumber(0, 10, step: 5); // Returns [0, 5, 10]
arrWithNumber(0, 10, step: 3); // Returns [0, 3, 6, 9]
```

:::

::: lang python

```python
arrWithNumber(1, 3)  # Returns [1, 2, 3]
arrWithNumber(0, 3)  # Returns [0, 1, 2, 3]
arrWithNumber(0, 10, step=5)  # Returns [0, 5, 10]
arrWithNumber(0, 10, step=3)  # Returns [0, 3, 6, 9]
```

:::
