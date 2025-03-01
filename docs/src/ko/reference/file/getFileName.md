# getFileName <Badge type="tip" text="JavaScript" />

<span class="node-required">Node.js 런타임 필요 ('qsu/node')</span>

경로 내의 파일 이름을 반환합니다.

## Parameters

- `filePath::string`: File or directory path
- `withExtension:boolean?|false`: Returns the name with extension.

## Returns

> string

## Examples

```javascript
getFileName('/home/user/test.txt'); // 'test'
getFileName('/home/user/test.txt', true); // 'test.txt'
```
