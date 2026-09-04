# sub
Returns after subtracting all n arguments of numbers or the values of a single array of numbers.

## Parameters

<ParamsTable :rows="[
	{ name: 'numbers', type: '...number[]', required: true }
]" />

## Returns

<ReturnType :type="{ js: 'number', dart: 'num' }" />

## Examples

::: lang js

```javascript
sub(10, 1, 5); // Returns 4
sub([1, 2, 3, 4]); // Returns -8
```

:::

::: lang dart

```dart
sub([10, 1, 5]); // Returns 4
sub([1, 2, 3, 4]); // Returns -8
```

:::

::: lang python

```python
sub(10, 1, 5) # Returns 4
sub([1, 2, 3, 4]) # Returns -8
```

:::
