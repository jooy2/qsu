# moveFile <Lang js />

<NodeRequired en />

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
