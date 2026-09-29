# median

Returns the middle value of an array of numbers. With an even number of values there is no single middle, so the mean of the two middle values is returned.

The values are sorted on a copy, so the array keeps its order. `NaN` values are skipped, as they are in [min](/reference/math/min) and [max](/reference/math/max). When nothing is left to compare, `null` is returned.

For the mean, use [average](./average).

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: { js: 'number[]', dart: 'List<num>', python: 'list[float]' }, required: true, desc: 'The numbers to read. It is not modified.' }
]" />

## Returns

<ReturnType :type="{ js: 'number | null', dart: 'num?', python: 'float | None' }" />

## Examples

::: lang js

```javascript
median([3, 1, 2]); // Returns 2
median([4, 1, 3, 2]); // Returns 2.5
median([1, NaN, 3]); // Returns 2
median([]); // Returns null
```

:::

::: lang dart

```dart
median([3, 1, 2]); // Returns 2
median([4, 1, 3, 2]); // Returns 2.5
median([1, double.nan, 3]); // Returns 2.0
median([]); // Returns null
```

:::

::: lang python

```python
median([3, 1, 2])  # Returns 2
median([4, 1, 3, 2])  # Returns 2.5
median([1, float('nan'), 3])  # Returns 2.0
median([])  # Returns None
```

:::
