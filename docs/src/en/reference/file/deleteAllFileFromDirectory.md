# deleteAllFileFromDirectory <Badge type="tip" text="JavaScript" />

<span class="node-required">Requires a Node.js runtime ('qsu/node')</span>

Deletes all files in the specified directory path. However, the directory is preserved.

## Parameters

- `directoryPath::string`: Directory path

## Returns

> Promise::void

## Examples

```javascript
await deleteAllFileFromDirectory('/home/user/Downloads');
```
