# fileSizeFormat <Lang js />

Returns the given file size (in bytes) as a human-readable string.

## Parameters

- `bytes::number`: Converts it to a human-friendly string via the bytes provided here.
- `decimals::number (Default: 2)` <DartNamed />: Specifies the number of decimal places to represent.

## Returns

> string

## Examples

```javascript
fileSizeFormat(1000000); // '976.56 KB'
fileSizeFormat(100000000, 3); // '95.367 MB'
```
