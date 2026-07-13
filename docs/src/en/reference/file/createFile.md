# createFile <Lang js dart python />

<NodeRequired en />

Create a file of empty data. If the same file already exists, it is ignored.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' }
]" />

## Returns

> Promise::void

## Examples

::: code-group

```javascript [JavaScript]
await createFile('/home/user/test.txt');
```

```dart [Dart]
await createFile('/home/user/test.txt');
```

```python [Python]
createFile('/home/user/test.txt')
```

:::
