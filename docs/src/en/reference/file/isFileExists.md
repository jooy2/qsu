# isFileExists <Lang js />

<NodeRequired en />

Returns `true` if the file at the given path exists.

## Parameters

- `filePath::string`

## Returns

> Promise:boolean

## Examples

```javascript
await isFileExists('text.txt'); // true
await isFileExists('not-exist.txt'); // false
```
