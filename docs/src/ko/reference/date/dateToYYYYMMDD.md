# dateToYYYYMMDD <Lang js />

Date 객체의 날짜 데이터를 `YYYY-MM-DD` 형식으로 반환합니다.

## Parameters

- `date::Date`
- `separator:string`

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
dateToYYYYMMDD(new Date(2023, 11, 31)); // Returns '2023-12-31'
```

```dart [Dart]
dateToYYYYMMDD(DateTime(2023, 12, 31)); // Returns '2023-12-31'
```

:::
