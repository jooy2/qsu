# getFileHashFromStream <Lang js python />

<NodeRequired en />

Returns a file in a Node.js ReadableStream object as a value hashed with a specific algorithm. The default algorithm is `md5`. This method uses `Promise` to return a valid hash value.

## Parameters

<ParamsTable :rows="[
	{ name: 'fileStream', type: 'string', required: true, desc: 'Node.js Readable file stream' },
	{ name: 'algorithm', type: `'md5' | 'sha1' | 'sha256' | 'sha512'`, default: `'md5'`, desc: 'OpenSSL algorithm to be used for file hashing' }
]" />

## Returns

> Promise::string

## Examples

```javascript
await getFileHashFromStream('/home/user/text.txt', 'sha1'); // '38851813f75627d581c593f3ccfb7061dd013fbd'
```

```python
getFileHashFromStream('/home/user/text.txt', 'sha1') # '38851813f75627d581c593f3ccfb7061dd013fbd'
```
