# getFilePathLevel <Badge type="tip" text="JavaScript" />

현재 경로가 몇 단계인지 결정합니다. 루트 경로(`/` 또는 `C:\`)는 1단계로 시작합니다.

## Parameters

- `filePath::string`

## Returns

> string

## Examples

```javascript
// Include 'C:\' root path
getFilePathLevel('C:\\Windows\\System32'); // 3
// Include '/' root path
getFilePathLevel('/home/user'); // 3
```
