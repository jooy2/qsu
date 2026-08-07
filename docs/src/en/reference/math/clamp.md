# clamp <Lang js dart python />

Restricts a number to an inclusive range. Returns `min` when the value falls below it, `max` when it rises above it, and the value itself otherwise.

The upper bound is applied first and the lower bound second, so `min` wins when the two bounds are passed the wrong way round: `clamp(5, 10, 1)` returns `10`. Lodash resolves an inverted range the same way.

Dart already ships `num.clamp`, but that method throws on an inverted range. This function exists so that the same call behaves identically in every language.

## Parameters

<ParamsTable :rows="[
	{ name: 'value', type: 'number', required: true, desc: 'The number to restrict.' },
	{ name: 'min', type: 'number', required: true, desc: 'The lower bound, included in the range.' },
	{ name: 'max', type: 'number', required: true, desc: 'The upper bound, included in the range.' }
]" />

## Returns

> number

## Examples

::: code-group

```javascript [JavaScript]
clamp(5, 1, 10); // Returns 5
clamp(-7, 1, 10); // Returns 1
clamp(42, 1, 10); // Returns 10
clamp(1.5, 0, 1); // Returns 1
clamp(5, 10, 1); // Returns 10 (inverted range: `min` wins)
```

```dart [Dart]
clamp(5, 1, 10); // Returns 5
clamp(-7, 1, 10); // Returns 1
clamp(42, 1, 10); // Returns 10
clamp(1.5, 0, 1); // Returns 1
clamp(5, 10, 1); // Returns 10 (inverted range: `min` wins)
```

```python [Python]
clamp(5, 1, 10)  # Returns 5
clamp(-7, 1, 10)  # Returns 1
clamp(42, 1, 10)  # Returns 10
clamp(1.5, 0, 1)  # Returns 1
clamp(5, 10, 1)  # Returns 10 (inverted range: `min` wins)
```

:::
