# toValidFilePath <Lang js />

<NodeRequired en />

Remove invalid or unnecessary characters in the path.

## Parameters

- `filePath::string`
- `isWindows::boolean`: Whether the target operating system to be checked is Windows

## Returns

> string

## Examples

```javascript
toValidFilePath('C:\\Windows\\System32\\', true); // 'C:\Windows\System32'
toValidFilePath('home/user/.bashrc'); // '/home/user/.bashrc'
```
