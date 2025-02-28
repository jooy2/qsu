# truncateExpect <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

The string ignores truncation until the ending character (`endStringChar`). If the expected length is reached, return the truncated string until after the ending character.

## Parameters

- `str::string`
- `expectLength::number`
- `endStringChar::string || '.'` <span class="named">Dart:Named</span>

## Returns

> string

## Examples

```javascript
truncateExpect('hello. this is test string.', 10, '.'); // Returns 'hello. this is test string.'
truncateExpect('hello-this-is-test-string-bye', 14, '-'); // Returns 'hello-this-is-'
```
