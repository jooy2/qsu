# capitalizeEachWords <Lang dart js python />

Converts every word with spaces to uppercase. If the naturally argument is true, only some special cases (such as prepositions) are kept lowercase.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'natural', type: 'boolean', named: true, default: 'false' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
capitalizeEachWords('abcd'); // Returns 'Abcd'
```

```dart [Dart]
capitalizeEachWords('abcd'); // Returns 'Abcd'
```

```python [Python]
capitalizeEachWords('abcd')  # Returns 'Abcd'
```

:::
