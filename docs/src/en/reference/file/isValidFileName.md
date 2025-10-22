# isValidFileName <Lang js />

<NodeRequired en />

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
