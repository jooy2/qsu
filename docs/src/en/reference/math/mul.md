# mul <Lang js dart python />

Returns after multiplying all n arguments of numbers or the values of a single array of numbers.

## Parameters

<ParamsTable :rows="[
	{ name: 'numbers', type: '...number[]', required: true }
]" />

## Returns

> number

## Examples

::: lang js

```javascript
mul(1, 2, 3); // Returns 6
mul([1, 2, 3, 4]); // Returns 24
```

:::

::: lang python

```python
mul(1, 2, 3) # Returns 6
mul([1, 2, 3, 4]) # Returns 24
```

:::
