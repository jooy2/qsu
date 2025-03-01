# getFileHash <Badge type="tip" text="JavaScript" />

<span class="node-required">Node.js 런타임 필요 ('qsu/node')</span>

지정된 경로에 있는 파일을 특정 알고리즘으로 해시된 값으로 반환합니다. 기본 알고리즘은 `md5`입니다. 이 메서드는 `Promise`를 사용하여 유효한 해시 값을 반환합니다.

## Parameters

- `filePath::string`: File path
- `algorithm::'md5'|'sha1'|'sha256'|'sha512'`: OpenSSL algorithm to be used for file hashing

## Returns

> Promise::string

## Examples

```javascript
await getFileHash('/home/user/text.txt', 'sha1'); // '38851813f75627d581c593f3ccfb7061dd013fbd'
```
