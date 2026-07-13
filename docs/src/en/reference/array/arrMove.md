# arrMove <Lang dart js python />

Moves the position of a specific element in an array to the specified position. (Position starts from 0.)

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true },
	{ name: 'from', type: 'number', required: true },
	{ name: 'to', type: 'number', required: true }
]" />

## Returns

> any[]

## Examples

::: code-group

```javascript [JavaScript]
arrMove([1, 2, 3, 4], 1, 0); // Returns [2, 1, 3, 4]
```

```dart [Dart]
arrMove([1, 2, 3, 4], 1, 0); // Returns [2, 1, 3, 4]
```

```python [Python]
arrMove([1, 2, 3, 4], 1, 0)  # Returns [2, 1, 3, 4]
```

:::
