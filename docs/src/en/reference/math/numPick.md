# numPick
Returns a randomly selected number between the min and max values.

## Parameters

<ParamsTable :rows="[
	{ name: 'min', type: 'number', required: true },
	{ name: 'max', type: 'number', required: true }
]" />

## Returns

<ReturnType type="number" />

## Examples

::: lang js

```javascript
numPick(1, 5); // Returns 1~5
numPick(10, 20); // Returns 10~20
```

:::

::: lang dart

```dart
numPick(1, 5); // Returns 1~5
numPick(10, 20); // Returns 10~20
```

:::

::: lang python

```python
numPick(1, 5)  # Returns 1~5
numPick(10, 20)  # Returns 10~20
```

:::
