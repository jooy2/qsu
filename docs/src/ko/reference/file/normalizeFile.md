# normalizeFile <Lang js dart python />

<NodeRequired ko />

경로 내의 파일 이름을 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' },
	{ name: 'normalizationForm', type: `'NFC' | 'NFD' | 'NFKC' | 'NFKD'`, named: true, desc: 'Normalization method (If value is `undefined`, `NFC` is used.)' }
]" />

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

```python [Python]
normalizeFile('안녕하세요Hello.txt', 'NFC') # '안녕하세요Hello.txt'
normalizeFile('안녕하세요Hello.txt', 'NFD') # '안녕하세요Hello.txt'
```

:::
