# removeNewLine <Lang dart js />

`\n`, `\r` 문자를 제거하거나 지정된 문자로 대체합니다.

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
