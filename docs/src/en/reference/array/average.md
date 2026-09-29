# average

Returns the average of all numeric values in an array.

An empty array has no average and returns `NaN`.

For the middle value, use [median](./median).

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: { js: 'number[]', dart: 'List<num>', python: 'list[float]' }, required: true }
]" />

## Returns

<ReturnType :type="{ js: 'number', dart: 'double', python: 'float' }" />

## Examples

::: lang js

```javascript
average([1, 5, 15, 50]); // Returns 17.75
average([]); // Returns NaN
```

:::

::: lang dart

```dart
average([1, 5, 15, 50]); // Returns 17.75
average([]); // Returns NaN
```

:::

::: lang python

```python
average([1, 5, 15, 50])  # Returns 17.75
average([])  # Returns nan
```

:::
