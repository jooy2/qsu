# numSum

Returns after adding up all the n arguments of numbers or the values of a single array of numbers.

## Parameters

<ParamsTable :rows="[
	{ name: 'numbers', type: '...number[]', required: true }
]" />

## Returns

<ReturnType :type="{ js: 'number', dart: 'num' }" />

## Examples

::: lang js

```javascript
numSum(1, 2, 3); // Returns 6
numSum([1, 2, 3, 4]); // Returns 10
```

:::

::: lang dart

```dart
numSum([1, 2, 3]); // Returns 6
numSum([1, 2, 3, 4]); // Returns 10
```

:::

::: lang python

```python
numSum(1, 2, 3) # Returns 6
numSum([1, 2, 3, 4]) # Returns 10
```

:::
