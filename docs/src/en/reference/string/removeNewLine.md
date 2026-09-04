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

::: lang js

```javascript
removeNewLine('ab\ncd'); // Returns 'abcd'
removeNewLine('ab\r\ncd', '-'); // Returns 'ab-cd'
```

:::

::: lang dart

```dart
removeNewLine('ab\ncd'); // Returns 'abcd'
removeNewLine('ab\r\ncd', replaceTo: '-'); // Returns 'ab-cd'
```

:::

::: lang python

```python
removeNewLine('ab\ncd')  # Returns 'abcd'
removeNewLine('ab\r\ncd', '-')  # Returns 'ab-cd'
```

:::
