# getFileSize <Lang js />

<NodeRequired en />

Returns the given byte argument as a human-friendly string.

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
