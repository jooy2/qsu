# toValidFilePath <Lang js dart python />

<NodeRequired en />

Remove invalid or unnecessary characters in the path.

`.` and `..` segments are resolved, and the result is always absolute. A `..` cannot climb above the root, so `../../etc/passwd` becomes `/etc/passwd`.

`.` and `..` segments are resolved, and a path that collapses to nothing returns the root.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true },
	{ name: 'isWindows', type: 'boolean', named: true, desc: 'Whether the target operating system to be checked is Windows' }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
toValidFilePath('C:\\Windows\\System32\\', true); // 'C:\Windows\System32'
toValidFilePath('home/user/.bashrc'); // '/home/user/.bashrc'
toValidFilePath('/home/user/../test'); // '/home/test'
```

:::

::: lang dart

```dart
toValidFilePath('C:\\Windows\\System32\\', isWindows: true); // 'C:\Windows\System32'
toValidFilePath('home/user/.bashrc'); // '/home/user/.bashrc'
toValidFilePath('/home/user/../test'); // '/home/test'
```

:::

::: lang python

```python
toValidFilePath('C:\\Windows\\System32\\', True) # 'C:\Windows\System32'
toValidFilePath('home/user/.bashrc') # '/home/user/.bashrc'
toValidFilePath('/home/user/../test') # '/home/test'
```

:::
