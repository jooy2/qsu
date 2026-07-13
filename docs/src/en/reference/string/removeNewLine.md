# removeNewLine <Lang dart js python />

Removes `\n`, `\r` characters or replaces them with specified characters.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'replaceTo', type: 'string', named: true, default: `''` }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
removeNewLine('ab\ncd'); // Returns 'abcd'
removeNewLine('ab\r\ncd', '-'); // Returns 'ab-cd'
```

```dart [Dart]
removeNewLine('ab\ncd'); // Returns 'abcd'
removeNewLine('ab\r\ncd', replaceTo: '-'); // Returns 'ab-cd'
```

```python [Python]
removeNewLine('ab\ncd')  # Returns 'abcd'
removeNewLine('ab\r\ncd', '-')  # Returns 'ab-cd'
```

:::
