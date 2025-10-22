# getFileHashFromStream <Lang js />

<NodeRequired ko />

Node.js ReadableStream 객체의 파일을 특정 알고리즘으로 해시된 값으로 반환합니다. 기본 알고리즘은 `md5`입니다. 이 메서드는 `Promise`를 사용하여 유효한 해시 값을 반환합니다.

## Parameters

- `fileStream::string`: Node.js Readable file stream
- `algorithm::'md5'|'sha1'|'sha256'|'sha512'`: OpenSSL algorithm to be used for file hashing

## Returns

> Promise::string

## Examples

```javascript
await getFileHashFromStream('/home/user/text.txt', 'sha1'); // '38851813f75627d581c593f3ccfb7061dd013fbd'
```
