# moveFile <Badge type="tip" text="JavaScript" />

<span class="node-required">Requires a Node.js runtime ('qsu/node')</span>

Moves a file in the specified file path to another path.

## Parameters

- `filePath::string`: File or directory path
- `targetFilePath::string`: Path of file to move

## Returns

> Promise::void

## Examples

```javascript
await moveFile('/home/user/text.txt', '/home/user/text2.txt');
```
