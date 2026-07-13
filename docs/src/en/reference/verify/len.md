# len <Lang dart js python />

Returns the length of any type of data. If the argument value is `null` or `undefined`, `0` is returned.

## Parameters

<ParamsTable :rows="[
	{ name: 'data', type: 'any', required: true }
]" />

## Returns

> boolean

## Examples

::: code-group

```javascript [JavaScript]
len('12345'); // Returns 5
len([1, 2, 3]); // Returns 3
```

```dart [Dart]
len('12345'); // Returns 5
len([1, 2, 3]); // Returns 3
```

```python [Python]
len('12345')  # Returns 5
len([1, 2, 3])  # Returns 3
```

:::
