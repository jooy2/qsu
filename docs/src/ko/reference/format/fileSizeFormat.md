# fileSizeFormat <Lang js dart />

주어진 파일 크기(바이트)를 사람이 읽기 쉬운 문자열로 반환합니다.

## Parameters

- `bytes::number`: Converts it to a human-friendly string via the bytes provided here.
- `decimals::number (Default: 2)` <DartNamed />: Specifies the number of decimal places to represent.

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
fileSizeFormat(1000000); // '976.56 KB'
fileSizeFormat(100000000, 3); // '95.367 MB'
```

```dart [Dart]
fileSizeFormat(1000000); // '976.56 KB'
fileSizeFormat(100000000, decimals: 3); // '95.367 MB'
```

:::
