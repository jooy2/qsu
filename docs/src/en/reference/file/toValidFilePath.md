# toValidFilePath <Badge type="tip" text="JavaScript" />

<span class="node-required">Requires a Node.js runtime ('qsu/node')</span>

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
