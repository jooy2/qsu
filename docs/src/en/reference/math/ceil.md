# ceil <Lang js dart python />

Rounds a number **up**, to the given number of decimal places. A negative `precision` rounds up to tens, hundreds and so on: `ceil(6040, -2)` returns `6100`.

Rounding goes toward positive infinity, not away from zero, so a negative value rises: `ceil(-4.006)` returns `-4`.

The value is shifted through its shortest string representation rather than multiplied by a power of ten, so the usual floating-point surprises do not happen: `ceil(1.1, 1)` returns `1.1`, not `1.2`, even though `1.1 * 10` is `11.000000000000002`.

`NaN` and the infinities are returned as they are.

This is the "always up" companion of [round](./round); [floor](./floor) is the "always down" one. All three take the same arguments.

## Parameters

<ParamsTable :rows="[
	{ name: 'value', type: 'number', required: true, desc: 'The number to round up.' },
	{ name: 'precision', type: 'number', default: '0', desc: 'Number of decimal places to round to. Must be a whole number; a negative value rounds to tens, hundreds and so on.' }
]" />

## Returns

> number

## Examples

::: code-group

```javascript [JavaScript]
ceil(4.006); // Returns 5
ceil(-4.006); // Returns -4
ceil(6.004, 2); // Returns 6.01
ceil(6040, -2); // Returns 6100
ceil(1.1, 1); // Returns 1.1
```

```dart [Dart]
ceil(4.006); // Returns 5
ceil(-4.006); // Returns -4
ceil(6.004, 2); // Returns 6.01
ceil(6040, -2); // Returns 6100
ceil(1.1, 1); // Returns 1.1
```

```python [Python]
ceil(4.006)  # Returns 5
ceil(-4.006)  # Returns -4
ceil(6.004, 2)  # Returns 6.01
ceil(6040, -2)  # Returns 6100
ceil(1.1, 1)  # Returns 1.1
```

:::
