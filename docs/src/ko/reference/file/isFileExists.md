# isFileExists <Badge type="tip" text="JavaScript" />

<span class="node-required">Node.js 런타임 필요 ('qsu/node')</span>

지정된 경로에 파일이 존재하면 `true`를 반환합니다.

## Parameters

- `filePath::string`

## Returns

> Promise:boolean

## Examples

```javascript
await isFileExists('text.txt'); // true
await isFileExists('not-exist.txt'); // false
```
