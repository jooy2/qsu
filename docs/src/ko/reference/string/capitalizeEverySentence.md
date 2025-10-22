# capitalizeEverySentence <Lang dart js />

모든 문장의 첫 글자를 대문자로 표기합니다. 일반적으로 문장을 구분하는 `.` 문자를 사용하지만, `splitChar` 인수의 값을 통해 사용자 정의할 수 있습니다.

## Parameters

- `str::string`
- `splitChar::string` <DartNamed />

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
