# isValidFileName <Badge type="tip" text="JavaScript" />

<span class="node-required">Requires a Node.js runtime ('qsu/node')</span>

Determines whether the passed path or filename is using a system-accepted string (Also check the valid file length). Returns false if the name is not available.

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
