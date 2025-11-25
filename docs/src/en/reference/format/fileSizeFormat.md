# fileSizeFormat <Lang js dart />

Returns the given file size (in bytes) as a human-readable string.

## Parameters

- `bytes::number`: Converts it to a human-friendly string via the bytes provided here.
- `decimals::number (Default: 2)` <DartNamed />: Specifies the number of decimal places to represent.
- `ceil::boolean` <DartNamed />: 이 값이 `true`이면 소수점을 제거하고 올림합니다.

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
fileSizeFormat(1000000); // '976.56 KB'
fileSizeFormat(100000000, 3); // '95.367 MB'
fileSizeFormat(100000000, 0, true); // '96 MB'
```

```dart [Dart]
fileSizeFormat(1000000); // '976.56 KB'
fileSizeFormat(100000000, decimals: 3); // '95.367 MB'
fileSizeFormat(100000000, ceil: true); // '96 MB'
```

:::
