# numberHash <Lang dart js />

<NodeRequired ko />

지정된 문자열을 숫자형 해시값으로 반환합니다. 반환값은 음수일 수도 있습니다.

## Parameters

- `str::string`

## Returns

> number

## Examples

::: code-group

```javascript [JavaScript]
numberHash('abc'); // Returns 96354
numberHash('Hello'); // Returns 69609650
numberHash('hello'); // Returns 99162322
```

```dart [Dart]
numberHash('abc'); // Returns 96354
numberHash('Hello'); // Returns 69609650
numberHash('hello'); // Returns 99162322
```

:::
