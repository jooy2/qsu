# div
Returns after dividing all n arguments of numbers or the values of a single array of numbers.

## Parameters

<ParamsTable :rows="[
	{ name: 'numbers', type: '...number[]', required: true }
]" />

## Returns

<ReturnType :type="{ js: 'number', dart: 'double' }" />

## Examples

::: lang js

```javascript
div(10, 5, 2); // Returns 1
div([100, 2, 2, 5]); // Returns 5
```

:::

::: lang dart

```dart
div([10, 5, 2]); // Returns 1.0
div([100, 2, 2, 5]); // Returns 5.0
```

:::

::: lang python

```python
div(10, 5, 2) # Returns 1
div([100, 2, 2, 5]) # Returns 5
```

:::
