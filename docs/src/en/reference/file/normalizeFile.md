# normalizeFile <Lang js dart />

<NodeRequired en />

Returns the file name within the path.

## Parameters

- `filePath::string`: File or directory path
- `normalizationForm::'NFC'|'NFD'|'NFKC'|'NFKD'|undefined` <DartNamed />: Normalization method (If value is `undefined`, `NFC` is used.)

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
normalizeFile('안녕하세요Hello.txt', 'NFC'); // '안녕하세요Hello.txt'
normalizeFile('안녕하세요Hello.txt', 'NFD'); // '안녕하세요Hello.txt'
```

```dart [Dart]
normalizeFile('안녕하세요Hello.txt', normalizationForm: 'NFC'); // '안녕하세요Hello.txt'
normalizeFile('안녕하세요Hello.txt', normalizationForm: 'NFD'); // '안녕하세요Hello.txt'
```

:::
