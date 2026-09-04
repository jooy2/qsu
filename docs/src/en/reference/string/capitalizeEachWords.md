# capitalizeEachWords
Converts every word with spaces to uppercase. If the naturally argument is true, only some special cases (such as prepositions) are kept lowercase.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'natural', type: 'boolean', named: true, default: 'false' }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
capitalizeEachWords('abcd'); // Returns 'Abcd'
```

:::

::: lang dart

```dart
capitalizeEachWords('abcd'); // Returns 'Abcd'
```

:::

::: lang python

```python
capitalizeEachWords('abcd')  # Returns 'Abcd'
```

:::
