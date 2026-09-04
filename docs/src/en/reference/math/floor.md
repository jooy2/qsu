# floor
Rounds a number **down**, to the given number of decimal places. A negative `precision` rounds down to tens, hundreds and so on: `floor(4060, -2)` returns `4000`.

Rounding goes toward negative infinity, not toward zero, so a negative value falls: `floor(-4.006)` returns `-5`.

The value is shifted through its shortest string representation rather than multiplied by a power of ten, so the usual floating-point surprises do not happen: `floor(1.1, 1)` returns `1.1`, not `1.0`.

`NaN` and the infinities are returned as they are.

This is the "always down" companion of [round](./round); [ceil](./ceil) is the "always up" one. All three take the same arguments.

## Parameters

<ParamsTable :rows="[
	{ name: 'value', type: { js: 'number', dart: 'num' }, required: true, desc: 'The number to round down.' },
	{ name: 'precision', type: 'number', default: '0', desc: 'Number of decimal places to round to. Must be a whole number; a negative value rounds to tens, hundreds and so on.' }
]" />

## Returns

<ReturnType :type="{ js: 'number', dart: 'num' }" />

## Examples

::: lang js

```javascript
floor(4.006); // Returns 4
floor(-4.006); // Returns -5
floor(0.046, 2); // Returns 0.04
floor(4060, -2); // Returns 4000
floor(1.1, 1); // Returns 1.1
```

:::

::: lang dart

```dart
floor(4.006); // Returns 4
floor(-4.006); // Returns -5
floor(0.046, 2); // Returns 0.04
floor(4060, -2); // Returns 4000
floor(1.1, 1); // Returns 1.1
```

:::

::: lang python

```python
floor(4.006)  # Returns 4
floor(-4.006)  # Returns -5
floor(0.046, 2)  # Returns 0.04
floor(4060, -2)  # Returns 4000
floor(1.1, 1)  # Returns 1.1
```

:::
