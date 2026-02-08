# strRandom <Lang dart js />

주어진 길이의 숫자 또는 대문자와 소문자를 포함하는 임의의 문자열을 반환합니다. 기본 반환 길이는 12입니다.

이 함수에서 생성되는 무작위 문자열은 고유성을 보장하지 않으므로 고유 ID를 생성하거나 보안 작업에 활용해서는 안됩니다.

## Parameters

- `length::number`
- `additionalCharacters::string?` <DartNamed />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
strRandom(5); // Returns 'CHy2M'
```

```dart [Dart]
strRandom(5); // Returns 'CHy2M'
```

:::
