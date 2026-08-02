# deleteFile <Lang js dart python />

<NodeRequired en />

Delete files or directory in the specified path. If the file does not exist in the path, it is ignored.

This method also supports deleting directory paths. If files exist within the directory, they are included and removed.

A symlink is unlinked, never followed, so the directory it points at is left alone. A path that is empty or nothing but whitespace does nothing.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' }
]" />

## Returns

> Promise::void

## Examples

::: code-group

```javascript [JavaScript]
await deleteFile('/home/user/text.txt');
```

```dart [Dart]
await deleteFile('/home/user/text.txt');
```

```python [Python]
deleteFile('/home/user/text.txt')
```

:::
