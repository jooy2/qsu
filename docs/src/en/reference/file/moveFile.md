# moveFile <Lang js dart python />

<NodeRequired en />

Moves a file in the specified file path to another path. A directory is moved the same way, with everything inside it.

A rename cannot cross a filesystem boundary, and moving out of the temporary directory, into a mounted volume or onto another drive is exactly that. When the operating system reports it, the entry is copied to the target and the source removed, so the move still completes.

A path that is empty or nothing but whitespace does nothing.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' },
	{ name: 'targetFilePath', type: 'string', required: true, desc: 'Path of file to move' }
]" />

## Returns

<ReturnType type="Promise<void>" />

## Examples

::: lang js

```javascript
await moveFile('/home/user/text.txt', '/home/user/text2.txt');
```

:::

::: lang dart

```dart
await moveFile('/home/user/text.txt', '/home/user/text2.txt');
```

:::

::: lang python

```python
moveFile('/home/user/text.txt', '/home/user/text2.txt')
```

:::
