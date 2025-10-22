# getFileHashFromPath <Lang js />

<NodeRequired en />

Returns the file in the specified path as a value hashed by a specific algorithm. The default algorithm is `md5`. This method uses a `Promise` to return a valid hash value.

## Parameters

- `filePath::string`: File path
- `algorithm::'md5'|'sha1'|'sha256'|'sha512'`: OpenSSL algorithm to be used for file hashing

## Returns

> Promise::string

## Examples

```javascript
await getFileHashFromPath('/home/user/text.txt', 'sha1'); // '38851813f75627d581c593f3ccfb7061dd013fbd'
```
