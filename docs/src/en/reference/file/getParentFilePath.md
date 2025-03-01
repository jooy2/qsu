# getParentFilePath <Badge type="tip" text="JavaScript" />

<span class="node-required">Requires a Node.js runtime ('qsu/node')</span>

Returns the parent path one level above the given path.

## Parameters

- `filePath::string`

## Returns

> string

## Examples

```javascript
getParentFilePath('C:\\Windows\\System32', true); // 'C:\Windows'
getParentFilePath('/home/user/text.txt'); // '/home/user'
```
