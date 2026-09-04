# getFileHashFromPath <Lang js dart python />

<NodeRequired en />

Returns the file in the specified path as a value hashed by a specific algorithm. The default algorithm is `md5`. This method uses a `Promise` to return a valid hash value.

::: warning
`md5` is the default because this function is most often used to tell two files apart. It is broken as a cryptographic hash — a collision can be constructed on purpose — so use `sha256` when the answer has to be trusted against a deliberate attempt to forge it.
:::

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File path' },
	{ name: 'algorithm', type: `'md5' | 'sha1' | 'sha256' | 'sha512'`, named: true, default: `'md5'`, desc: 'OpenSSL algorithm to be used for file hashing' }
]" />

## Returns

<ReturnType type="Promise<string>" />

## Examples

::: lang js

```javascript
await getFileHashFromPath('/home/user/text.txt', 'sha1'); // '38851813f75627d581c593f3ccfb7061dd013fbd'
```

:::

::: lang dart

```dart
await getFileHashFromPath('/home/user/text.txt', algorithm: 'sha1'); // '38851813f75627d581c593f3ccfb7061dd013fbd'
```

:::

::: lang python

```python
getFileHashFromPath('/home/user/text.txt', 'sha1') # '38851813f75627d581c593f3ccfb7061dd013fbd'
```

:::
