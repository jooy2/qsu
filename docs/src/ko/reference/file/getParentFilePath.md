# getParentFilePath <Badge type="tip" text="JavaScript" />

지정된 경로보다 한 단계 위의 상위 경로를 반환합니다.

## Parameters

- `filePath::string`

## Returns

> string

## Examples

```javascript
getParentFilePath('C:\\Windows\\System32', true); // 'C:\Windows'
getParentFilePath('/home/user/text.txt'); // '/home/user'
```
