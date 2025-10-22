# capitalizeEverySentence <Lang dart js />

Capitalize the first letter of every sentence. Typically, the `.` characters to separate sentences, but this can be customized via the value of the `splitChar` argument.

## Parameters

- `str::string`
- `splitChar::string` <span class="named">Dart:Named</span>

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
capitalizeEverySentence('hello. world. hi.'); // Returns 'Hello. World. Hi.'
capitalizeEverySentence('hello!world', '!'); // Returns 'Hello!World'
```

```dart [Dart]
capitalizeEverySentence('hello. world. hi.'); // Returns 'Hello. World. Hi.'
capitalizeEverySentence('hello!world', splitChar: '!'); // Returns 'Hello!World'
```

:::
