# createFileWithDummy <Lang js dart python />

<NodeRequired en />

Creates a file with the specified size in bytes.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' },
	{ name: 'size', type: 'number', required: true, named: true, desc: 'Size of the file to be created (Dummy data is filled as much as the given size)' }
]" />

## Returns

> Promise::void

## Examples

::: code-group

```javascript [JavaScript]
await createFileWithDummy('/home/user/test.txt', 100000);
```

```dart [Dart]
await createFileWithDummy('/home/user/test.txt', size: 100000);
```

```python [Python]
createFileWithDummy('/home/user/test.txt', 100000)
```

:::
