# toValidFilePath <Lang js dart python />

<NodeRequired en />

Remove invalid or unnecessary characters in the path.

`.` and `..` segments are resolved, and a path that collapses to nothing returns the root.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true },
	{ name: 'isWindows', type: 'boolean', named: true, desc: 'Whether the target operating system to be checked is Windows' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
toValidFilePath('C:\\Windows\\System32\\', true); // 'C:\Windows\System32'
toValidFilePath('home/user/.bashrc'); // '/home/user/.bashrc'
toValidFilePath('/home/user/../test'); // '/home/test'
```

```dart [Dart]
toValidFilePath('C:\\Windows\\System32\\', isWindows: true); // 'C:\Windows\System32'
toValidFilePath('home/user/.bashrc'); // '/home/user/.bashrc'
toValidFilePath('/home/user/../test'); // '/home/test'
```

```python [Python]
toValidFilePath('C:\\Windows\\System32\\', True) # 'C:\Windows\System32'
toValidFilePath('home/user/.bashrc') # '/home/user/.bashrc'
toValidFilePath('/home/user/../test') # '/home/test'
```

:::
