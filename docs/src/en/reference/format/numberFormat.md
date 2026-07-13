# numberFormat <Lang dart js python />

Returns the given number formatted for easy reading, including commas.

## Parameters

<ParamsTable :rows="[
	{ name: 'number', type: 'number', required: true }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
numberFormat(1234567); // Returns 1,234,567
```

```dart [Dart]
numberFormat(1234567); // Returns 1,234,567
```

```python [Python]
numberFormat(1234567)  # Returns 1,234,567
```

:::
