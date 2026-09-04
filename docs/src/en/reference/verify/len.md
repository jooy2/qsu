# len <Lang dart js python />

Returns the length of any type of data. If the argument value is `null` or `undefined`, `0` is returned.

## Parameters

<ParamsTable :rows="[
	{ name: 'data', type: 'any', required: true }
]" />

## Returns

> number

## Examples

::: lang js

```javascript
len('12345'); // Returns 5
len([1, 2, 3]); // Returns 3
```

:::

::: lang dart

```dart
len('12345'); // Returns 5
len([1, 2, 3]); // Returns 3
```

:::

::: lang python

```python
len('12345')  # Returns 5
len([1, 2, 3])  # Returns 3
```

:::
