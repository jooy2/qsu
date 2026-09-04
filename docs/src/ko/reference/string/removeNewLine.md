# removeNewLine <Lang dart js python />

`\n`, `\r` 문자를 제거하거나 지정된 문자로 대체합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'replaceTo', type: 'string', named: true, default: `''` }
]" />

## Returns

<ReturnType type="string" />

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
