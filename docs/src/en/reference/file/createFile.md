# createFile <Lang js dart python />

<NodeRequired en />

Create a file of empty data. If the same file already exists, it is ignored.

Any parent directory the path needs is created along with the file.

A path that is empty or nothing but whitespace does nothing, so an empty form field does not become a file literally named `   `.

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
