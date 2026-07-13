# sum <Lang js dart python />

Returns after adding up all the n arguments of numbers or the values of a single array of numbers.

## Parameters

<ParamsTable :rows="[
	{ name: 'numbers', type: '...number[]', required: true }
]" />

## Returns

> number

## Examples

::: code-group

```javascript [JavaScript]
sum(1, 2, 3); // Returns 6
sum([1, 2, 3, 4]); // Returns 10
```

```python [Python]
sum(1, 2, 3) # Returns 6
sum([1, 2, 3, 4]) # Returns 10
```

:::
