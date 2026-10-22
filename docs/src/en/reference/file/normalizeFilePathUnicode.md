# normalizeFilePathUnicode

<NodeRequired en />

Returns the file name within the path.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' },
	{ name: 'normalizationForm', type: `'NFC' | 'NFD' | 'NFKC' | 'NFKD'`, named: true, default: `'NFC'`, desc: 'Normalization method.' }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
normalizeFilePathUnicode('안녕하세요Hello.txt', 'NFC'); // '안녕하세요Hello.txt'
normalizeFilePathUnicode('안녕하세요Hello.txt', 'NFD'); // '안녕하세요Hello.txt'
```

:::

::: lang dart

```dart
normalizeFilePathUnicode('안녕하세요Hello.txt', normalizationForm: 'NFC'); // '안녕하세요Hello.txt'
normalizeFilePathUnicode('안녕하세요Hello.txt', normalizationForm: 'NFD'); // '안녕하세요Hello.txt'
```

:::

::: lang python

```python
normalizeFilePathUnicode('안녕하세요Hello.txt', 'NFC') # '안녕하세요Hello.txt'
normalizeFilePathUnicode('안녕하세요Hello.txt', 'NFD') # '안녕하세요Hello.txt'
```

:::
