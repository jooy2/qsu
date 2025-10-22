# trim <Lang dart js />

문자열 앞뒤의 모든 공백을 제거합니다. JavaScript의 `trim` 함수와는 달리, 문장 사이에 있는 두 개 이상의 공백을 하나의 공백으로 변환합니다.

## Parameters

- `str::string`

## Returns

> string

## Examples

```javascript [JavaScript]
trim(' Hello Wor  ld  '); // Returns 'Hello Wor ld'
trim('H e l l o     World'); // Returns 'H e l l o World'
```

```dart [Dart]
trim(' Hello Wor  ld  '); // Returns 'Hello Wor ld'
trim('H e l l o     World'); // Returns 'H e l l o World'
```

:::
