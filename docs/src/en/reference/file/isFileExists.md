# isFileExists <Lang js dart python />

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

```python
isFileExists('text.txt') # True
isFileExists('not-exist.txt') # False
```
