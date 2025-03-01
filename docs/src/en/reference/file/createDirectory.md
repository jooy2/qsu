# createDirectory <Badge type="tip" text="JavaScript" />

<span class="node-required">Requires a Node.js runtime ('qsu/node')</span>

Creates a directory with the specified path. Ignores the operation if the directory already exists.

## Parameters

- `filePath::string`: File or directory path
- `recursive::boolean?|true`: Recursively creates all directories in the given path.

## Returns

> void

## Examples

```javascript
createDirectory('/home/user/a/b/c');
```
