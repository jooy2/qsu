# createDirectory <Badge type="tip" text="JavaScript" />

<span class="node-required">Node.js 런타임 필요 ('qsu/node')</span>

지정된 경로로 디렉토리를 생성합니다. 디렉토리가 이미 존재하는 경우, 이 작업은 무시됩니다.

## Parameters

- `filePath::string`: File or directory path
- `recursive::boolean?|true`: Recursively creates all directories in the given path.

## Returns

> void

## Examples

```javascript
createDirectory('/home/user/a/b/c');
```
