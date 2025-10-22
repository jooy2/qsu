# getFileExtension <Lang js />

<NodeRequired ko />

지정된 파일 경로에서 파일 확장자를 반환합니다. 확장자가 없는 파일의 경우 빈 문자열 값이 반환됩니다.

## Parameters

- `filePath::string`: File or directory path
- `isWindows::boolean`: Whether the target operating system to be checked is Windows

## Returns

> string

## Examples

```javascript
getFileExtension('/home/user/test.txt'); // 'txt'
getFileExtension('/home/user/test.txt.sample'); // 'sample'
```
