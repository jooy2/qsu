# removeNewlines

Removes `\n`, `\r` characters or replaces them with specified characters.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'replaceWith', type: 'string', named: true, default: `''` }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
removeNewlines('ab\ncd'); // Returns 'abcd'
removeNewlines('ab\r\ncd', '-'); // Returns 'ab-cd'
```

:::

::: lang dart

```dart
removeNewlines('ab\ncd'); // Returns 'abcd'
removeNewlines('ab\r\ncd', replaceWith: '-'); // Returns 'ab-cd'
```

:::

::: lang python

```python
removeNewlines('ab\ncd')  # Returns 'abcd'
removeNewlines('ab\r\ncd', '-')  # Returns 'ab-cd'
```

:::
