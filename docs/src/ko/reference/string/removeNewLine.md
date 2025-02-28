# removeNewLine <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

`\n`, `\r` 문자를 제거하거나 지정된 문자로 대체합니다.

## Parameters

- `str::string`
- `replaceTo::string || ''` <span class="named">Dart:Named</span>

## Returns

> string

## Examples

```javascript
removeNewLine('ab\ncd'); // Returns 'abcd'
removeNewLine('ab\r\ncd', '-'); // Returns 'ab-cd'
```

```dart
removeNewLine('ab\ncd'); // Returns 'abcd'
removeNewLine('ab\r\ncd', replaceTo: '-'); // Returns 'ab-cd'
```
