# truncateExpect <Lang dart js />

이 문자열은 끝 문자(`endStringChar`)까지 잘림을 무시합니다. 예상 길이에 도달하면, 끝 문자 뒤의 잘린 문자열을 반환합니다.

## Parameters

- `str::string`
- `expectLength::number`
- `endStringChar::string || '.'` <span class="named">Dart:Named</span>

## Returns

> string

## Examples

```javascript [JavaScript]
truncateExpect('hello. this is test string.', 10, '.'); // Returns 'hello. this is test string.'
truncateExpect('hello-this-is-test-string-bye', 14, '-'); // Returns 'hello-this-is-'
```

```dart [Dart]
truncateExpect('hello. this is test string.', 10, endStringChar: '.'); // Returns 'hello. this is test string.'
truncateExpect('hello-this-is-test-string-bye', 14, endStringChar: '-'); // Returns 'hello-this-is-'
```

:::
