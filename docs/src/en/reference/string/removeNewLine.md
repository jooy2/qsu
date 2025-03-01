# removeNewLine <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Removes `\n`, `\r` characters or replaces them with specified characters.

## Parameters

- `str::string`
- `replaceTo::string || ''` <span class="named">Dart:Named</span>

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

:::
