# createFile <Badge type="tip" text="JavaScript" />

<span class="node-required">Requires a Node.js runtime ('qsu/node')</span>

Create a file of empty data. If the same file already exists, it is ignored.

## Parameters

- `filePath::string`: File or directory path

## Returns

> Promise::void

## Examples

```javascript
await createFile('/home/user/test.txt');
```
