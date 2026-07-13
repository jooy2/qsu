# numPick <Lang dart js python />

Returns a randomly selected number between the min and max values.

## Parameters

<ParamsTable :rows="[
	{ name: 'min', type: 'number', required: true },
	{ name: 'max', type: 'number', required: true }
]" />

## Returns

> number

## Examples

::: code-group

```javascript [JavaScript]
numPick(1, 5); // Returns 1~5
numPick(10, 20); // Returns 10~20
```

```dart [Dart]
numPick(1, 5); // Returns 1~5
numPick(10, 20); // Returns 10~20
```

```python [Python]
numPick(1, 5)  # Returns 1~5
numPick(10, 20)  # Returns 10~20
```

:::
