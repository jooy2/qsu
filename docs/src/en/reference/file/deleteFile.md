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

::: lang js

```javascript
await deleteFile('/home/user/text.txt');
```

:::

::: lang dart

```dart
await deleteFile('/home/user/text.txt');
```

:::

::: lang python

```python
deleteFile('/home/user/text.txt')
```

:::
