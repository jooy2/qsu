# moveFile <Badge type="tip" text="JavaScript" />

<span class="node-required">Node.js 런타임 필요 ('qsu/node')</span>

지정된 파일 경로에 있는 파일을 다른 경로로 이동합니다.

## Parameters

- `filePath::string`: File or directory path
- `targetFilePath::string`: Path of file to move

## Returns

> Promise::void

## Examples

```javascript
await moveFile('/home/user/text.txt', '/home/user/text2.txt');
```
