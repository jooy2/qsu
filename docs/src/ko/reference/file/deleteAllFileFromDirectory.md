# deleteAllFileFromDirectory <Badge type="tip" text="JavaScript" />

<span class="node-required">Node.js 런타임 필요 ('qsu/node')</span>

지정된 디렉토리 경로에 있는 모든 파일을 삭제합니다. 그러나 디렉토리는 보존됩니다.

## Parameters

- `directoryPath::string`: Directory path

## Returns

> Promise::void

## Examples

```javascript
await deleteAllFileFromDirectory('/home/user/Downloads');
```
