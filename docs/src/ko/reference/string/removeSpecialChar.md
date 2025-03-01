# removeSpecialChar <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

공백을 포함한 모든 특수 문자를 제거한 후 반환됩니다. 예외로 특수 문자를 허용하려면 구분 기호 없이 두 번째 인수 값에 특수 문자를 나열하십시오. 예를 들어, 공백과 `&` 및 `*` 기호를 허용하려면 두 번째 인수 값은 '(&\*)'가 됩니다.

## Parameters

- `str::string`
- `exceptionCharacters::string?` <span class="named">Dart:Named</span>

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
removeSpecialChar('Hello-qsu, World!'); // Returns 'HelloqsuWorld'
removeSpecialChar('Hello-qsu, World!', ' -'); // Returns 'Hello-qsu World'
```

```dart [Dart]
removeSpecialChar('Hello-qsu, World!'); // Returns 'HelloqsuWorld'
removeSpecialChar('Hello-qsu, World!', exceptionCharacters: ' -'); // Returns 'Hello-qsu World'
```

:::
