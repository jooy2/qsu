# truncate <Lang dart js python />

Truncates a long string to a specified length, optionally appending an ellipsis after the string.

Length is counted in code points, so a character outside the Basic Multilingual Plane counts as one in every language and is never cut in half.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true, desc: 'The string to truncate.' },
	{ name: 'length', type: 'number', required: true, desc: 'The length to truncate at, counted in code points.' },
	{ name: 'ellipsis', type: 'string', named: true, default: `''`, desc: 'Appended after the string, but only when it was actually truncated.' }
]" />

## Returns

> string

## Examples

::: lang js

```javascript
truncate('hello', 3); // Returns 'hel'
truncate('hello', 2, '...'); // Returns 'he...'
```

:::

::: lang dart

```dart
truncate('hello', 3); // Returns 'hel'
truncate('hello', 2, ellipsis: '...'); // Returns 'he...'
```

:::

::: lang python

```python
truncate('hello', 3)  # Returns 'hel'
truncate('hello', 2, '...')  # Returns 'he...'
```

:::
