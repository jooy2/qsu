# getFileSize <Badge type="tip" text="JavaScript" />

주어진 바이트 인수를 사람이 읽기 쉬운 문자열로 반환합니다.

## Parameters

- `bytes::number`: Converts it to a human-friendly string via the bytes provided here.
- `decimals::number (Default: 2)`: Specifies the number of decimal places to represent.

## Returns

> string

## Examples

```javascript
getFileSize(1000000); // '976.56 KB'
getFileSize(100000000, 3); // '95.367 MB'
```
