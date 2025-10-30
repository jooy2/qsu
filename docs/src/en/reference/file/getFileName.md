# getFileName <Lang js dart />

<NodeRequired en />

Returns the file name within the path.

## Parameters

- `filePath::string`: File or directory path
- `withExtension:boolean?|false` <DartNamed />: Returns the name with extension.

## Returns

> string

## Examples

```javascript
getFileName('/home/user/test.txt'); // 'test'
getFileName('/home/user/test.txt', true); // 'test.txt'
```
