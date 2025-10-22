# joinFilePath <Lang js />

<NodeRequired en />

Combines paths for each operating system according to the given parameter values.

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
