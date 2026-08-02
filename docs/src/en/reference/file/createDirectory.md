# createDirectory <Lang js dart python />

<NodeRequired en />

Creates a directory with the specified path. Ignores the operation if the directory already exists.

If a **file** already sits at the path, the error is reported rather than swallowed: nothing usable as a directory was created, so answering "already there" would be a lie.

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
