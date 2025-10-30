# isFileExists <Lang js dart />

<NodeRequired en />

If a file or directory exists at the specified path, it returns `true`.

## Parameters

- `filePath::string`

## Returns

> Promise:boolean

## Examples

```javascript
await isFileExists('text.txt'); // true
await isFileExists('not-exist.txt'); // false
```
