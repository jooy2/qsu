# average
Returns the average of all numeric values in an array.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: { js: 'number[]', dart: 'List<double>' }, required: true }
]" />

## Returns

<ReturnType :type="{ js: 'number', dart: 'double', python: 'float' }" />

## Examples

::: lang js

```javascript
average([1, 5, 15, 50]); // Returns 17.75
```

:::

::: lang dart

```dart
average([1, 5, 15, 50]); // Returns 17.75
```

:::

::: lang python

```python
average([1, 5, 15, 50])  # Returns 17.75
```

:::
