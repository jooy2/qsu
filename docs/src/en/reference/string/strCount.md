# strCount <Lang dart js python />

Returns the number of times the second String argument is contained in the first String argument.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'search', type: 'string', required: true }
]" />

## Returns

> number

## Examples

::: code-group

```javascript [JavaScript]
strCount('abcabc', 'a'); // Returns 2
```

```dart [Dart]
strCount('abcabc', 'a'); // Returns 2
```

```python [Python]
strCount('abcabc', 'a')  # Returns 2
```

:::
