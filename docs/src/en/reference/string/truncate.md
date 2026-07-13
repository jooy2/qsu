# truncate <Lang dart js python />

Truncates a long string to a specified length, optionally appending an ellipsis after the string.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'length', type: 'number', required: true },
	{ name: 'ellipsis', type: 'string', named: true, default: `''` }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
truncate('hello', 3); // Returns 'hel'
truncate('hello', 2, '...'); // Returns 'he...'
```

```dart [Dart]
truncate('hello', 3); // Returns 'hel'
truncate('hello', 2, ellipsis: '...'); // Returns 'he...'
```

```python [Python]
truncate('hello', 3)  # Returns 'hel'
truncate('hello', 2, '...')  # Returns 'he...'
```

:::
