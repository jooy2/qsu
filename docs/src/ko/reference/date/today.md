# today <Lang js />

오늘 날짜를 반환합니다.

## Parameters

- `separator::string = '-'` <DartNamed />
- `yearFirst::boolean = false` <DartNamed />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
today(); // Returns YYYY-MM-DD
today('/'); // Returns YYYY/MM/DD
today('/', false); // Returns DD/MM/YYYY
```

```dart [Dart]
today(); // Returns YYYY-MM-DD
today(separator: '/'); // Returns YYYY/MM/DD
today(separator: '/', yearFirst: false); // Returns DD/MM/YYYY
```

:::
