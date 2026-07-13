# getFileHashFromPath <Lang js dart python />

<NodeRequired en />

Returns the file in the specified path as a value hashed by a specific algorithm. The default algorithm is `md5`. This method uses a `Promise` to return a valid hash value.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File path' },
	{ name: 'algorithm', type: `'md5' | 'sha1' | 'sha256' | 'sha512'`, named: true, default: `'md5'`, desc: 'OpenSSL algorithm to be used for file hashing' }
]" />

## Returns

> Promise::string

## Examples

::: code-group

```javascript [JavaScript]
await getFileHashFromPath('/home/user/text.txt', 'sha1'); // '38851813f75627d581c593f3ccfb7061dd013fbd'
```

```dart [Dart]
await getFileHashFromPath('/home/user/text.txt', algorithm: 'sha1'); // '38851813f75627d581c593f3ccfb7061dd013fbd'
```

```python [Python]
getFileHashFromPath('/home/user/text.txt', 'sha1') # '38851813f75627d581c593f3ccfb7061dd013fbd'
```

:::
