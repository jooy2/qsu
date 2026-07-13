# moveFile <Lang js dart python />

<NodeRequired en />

Moves a file in the specified file path to another path.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' },
	{ name: 'targetFilePath', type: 'string', required: true, desc: 'Path of file to move' }
]" />

## Returns

> Promise::void

## Examples

::: code-group

```javascript [JavaScript]
await moveFile('/home/user/text.txt', '/home/user/text2.txt');
```

```dart [Dart]
await moveFile('/home/user/text.txt', '/home/user/text2.txt');
```

```python [Python]
moveFile('/home/user/text.txt', '/home/user/text2.txt')
```

:::
