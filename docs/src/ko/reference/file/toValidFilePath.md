# toValidFilePath <Badge type="tip" text="JavaScript" />

<span class="node-required">Node.js 런타임 필요 ('qsu/node')</span>

경로에 있는 유효하지 않거나 불필요한 문자를 제거합니다.

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
