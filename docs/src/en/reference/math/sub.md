# sub <Lang js dart python />

Returns after subtracting all n arguments of numbers or the values of a single array of numbers.

## Parameters

<ParamsTable :rows="[
	{ name: 'numbers', type: '...number[]', required: true }
]" />

## Returns

> number

## Examples

::: code-group

```javascript [JavaScript]
sub(10, 1, 5); // Returns 4
sub([1, 2, 3, 4]); // Returns -8
```

```python [Python]
sub(10, 1, 5) # Returns 4
sub([1, 2, 3, 4]) # Returns -8
```

:::
