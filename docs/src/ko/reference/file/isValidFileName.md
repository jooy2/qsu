# isValidFileName <Lang js />

<NodeRequired ko />

전달된 경로 또는 파일 이름이 시스템에서 허용하는 문자열을 사용하는지 여부를 결정합니다(또한 유효한 파일 길이도 확인합니다). 이름을 사용할 수 없는 경우 false를 반환합니다.

## Parameters

- `filePath::string`: File or directory path
- `unixType::boolean?`: Passes true if the file type is unix type.

## Returns

> boolean

## Examples

```javascript
isValidFileName('C:\\Windows\\System32*'); // false
isValidFileName('/home/user/.bashrc', true); // true
```
