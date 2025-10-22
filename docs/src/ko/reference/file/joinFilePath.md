# joinFilePath <Lang js />

<NodeRequired ko />

지정된 매개 변수 값에 따라 각 운영 체제에 대한 경로를 결합합니다.

## Parameters

- `isWindows::boolean`: Whether the target operating system to be checked is Windows
- `paths::string[]`: A path value consisting of one or more strings. Omit the path separator and put it in the parameter.

## Returns

> string

## Examples

```javascript
joinFilePath(true, 'C:\\', 'Windows', 'System32'); // 'C:\Windows\System32'
joinFilePath(false, 'home', '/user', '.bashrc'); // '/home/user/.bashrc'
```
