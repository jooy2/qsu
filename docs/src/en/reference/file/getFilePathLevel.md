# getFilePathLevel <Badge type="tip" text="JavaScript" />

<span class="node-required">Requires a Node.js runtime ('qsu/node')</span>

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
