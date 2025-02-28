# normalizeFile <Badge type="tip" text="JavaScript" />

Returns the file name within the path.

## Parameters

- `filePath::string`: File or directory path
- `normalizationForm::'NFC'|'NFD'|'NFKC'|'NFKD'|undefined`: Normalization method (If value is `undefined`, `NFC` is used.)

## Returns

> string

## Examples

```javascript
normalizeFile('안녕하세요Hello.txt', 'NFC'); // '안녕하세요Hello.txt'
normalizeFile('안녕하세요Hello.txt', 'NFD'); // '안녕하세요Hello.txt'
```
