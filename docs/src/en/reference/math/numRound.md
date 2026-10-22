# numRound

Rounds a number to the given number of decimal places. A negative `precision` rounds to tens, hundreds and so on: `numRound(1234, -2)` returns `1200`.

**Ties round half away from zero**, so `0.5` becomes `1` and `-0.5` becomes `-1`. This is a parity fix first and a precision helper second, because the three languages disagree natively — `0.5` gives `1` in JavaScript, `1` in Dart and `0` in Python; `-1.5` gives `-1`, `-2` and `-2`. Lodash also differs here: it sends ties toward positive infinity, so `_.round(-0.5)` is `-0`.

The value is shifted through its shortest string representation rather than multiplied by a power of ten, so the usual floating-point surprises do not happen: `numRound(1.005, 2)` returns `1.01`, not `1`, and `numRound(2.675, 2)` returns `2.68`.

`NaN` and the infinities are returned as they are.

To round up or down instead of to the nearest value, use [ceil](./ceil) and [floor](./floor), which take the same arguments.

## Parameters

<ParamsTable :rows="[
	{ name: 'value', type: { js: 'number', dart: 'num' }, required: true, desc: 'The number to round.' },
	{ name: 'precision', type: 'number', default: '0', desc: 'Number of decimal places to round to. Must be a whole number; a negative value rounds to tens, hundreds and so on.' }
]" />

## Returns

<ReturnType :type="{ js: 'number', dart: 'num' }" />

## Examples

::: lang js

```javascript
numRound(0.5); // Returns 1
numRound(2.5); // Returns 3
numRound(-0.5); // Returns -1
numRound(-1.5); // Returns -2
numRound(1.005, 2); // Returns 1.01
numRound(2.675, 2); // Returns 2.68
numRound(1234, -2); // Returns 1200
```

:::

::: lang dart

```dart
numRound(0.5); // Returns 1
numRound(2.5); // Returns 3
numRound(-0.5); // Returns -1
numRound(-1.5); // Returns -2
numRound(1.005, 2); // Returns 1.01
numRound(2.675, 2); // Returns 2.68
numRound(1234, -2); // Returns 1200
```

:::

::: lang python

```python
numRound(0.5)  # Returns 1
numRound(2.5)  # Returns 3
numRound(-0.5)  # Returns -1
numRound(-1.5)  # Returns -2
numRound(1.005, 2)  # Returns 1.01
numRound(2.675, 2)  # Returns 2.68
numRound(1234, -2)  # Returns 1200
```

:::
