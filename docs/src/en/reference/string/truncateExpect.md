# truncateExpect <Lang dart js python />

The string ignores truncation until the ending character (`endStringChar`). If the expected length is reached, return the truncated string until after the ending character.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'expectLength', type: 'number', required: true },
	{ name: 'endStringChar', type: 'string', named: true, default: `'.'` }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
truncateExpect('hello. this is test string.', 10, '.'); // Returns 'hello. this is test string.'
truncateExpect('hello-this-is-test-string-bye', 14, '-'); // Returns 'hello-this-is-'
```

```dart [Dart]
truncateExpect('hello. this is test string.', 10, endStringChar: '.'); // Returns 'hello. this is test string.'
truncateExpect('hello-this-is-test-string-bye', 14, endStringChar: '-'); // Returns 'hello-this-is-'
```

```python [Python]
truncateExpect('hello. this is test string.', 10, '.')  # Returns 'hello. this is test string.'
truncateExpect('hello-this-is-test-string-bye', 14, '-')  # Returns 'hello-this-is-'
```

:::
