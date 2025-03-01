# getFileExtension <Badge type="tip" text="JavaScript" />

<span class="node-required">Requires a Node.js runtime ('qsu/node')</span>

Returns the file extension from the given file path. An empty string value is returned for files without extension.

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
