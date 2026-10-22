# removeNewlines

`\n`, `\r` 문자를 제거하거나 지정된 문자로 대체합니다.

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
