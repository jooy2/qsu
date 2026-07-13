# moveFile <Lang js dart python />

<NodeRequired ko />

지정된 파일 경로에 있는 파일을 다른 경로로 이동합니다.

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
