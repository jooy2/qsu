# createFile <Badge type="tip" text="JavaScript" />

<span class="node-required">Node.js 런타임 필요 ('qsu/node')</span>

빈 데이터로 된 파일을 만듭니다. 같은 파일이 이미 존재하는 경우, 그 파일은 무시됩니다.

## Parameters

- `filePath::string`: File or directory path

## Returns

> Promise::void

## Examples

```javascript
await createFile('/home/user/test.txt');
```
