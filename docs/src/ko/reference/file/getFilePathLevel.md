# getFilePathLevel <Badge type="tip" text="JavaScript" />

Determine how many steps the current path is. The root path (`/` or `C:\`) begins with step 1.

## Parameters

- `filePath::string`

## Returns

> string

## Examples

```javascript
// Include 'C:\' root path
getFilePathLevel('C:\\Windows\\System32'); // 3
// Include '/' root path
getFilePathLevel('/home/user'); // 3
```
