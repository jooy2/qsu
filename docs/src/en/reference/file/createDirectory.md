# createDirectory <Lang js dart python />

<NodeRequired en />

Creates a directory with the specified path. Ignores the operation if the directory already exists.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' },
	{ name: 'recursive', type: 'boolean', named: true, default: 'true', desc: 'Recursively creates all directories in the given path.' }
]" />

## Returns

> void

## Examples

::: code-group

```javascript [JavaScript]
createDirectory('/home/user/a/b/c');
```

```dart [Dart]
createDirectory('/home/user/a/b/c');
```

```python [Python]
createDirectory('/home/user/a/b/c')
```

:::
