# deleteFile <Badge type="tip" text="JavaScript" />

<span class="node-required">Requires a Node.js runtime ('qsu/node')</span>

Delete files or directory in the specified path. If the file does not exist in the path, it is ignored.

This method also supports deleting directory paths. If files exist within the directory, they are included and removed.

## Parameters

- `filePath::string`: File or directory path

## Returns

> Promise::void

## Examples

```javascript
await deleteFile('/home/user/text.txt');
```
