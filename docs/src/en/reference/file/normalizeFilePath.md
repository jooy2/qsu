# normalizeFilePath

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
normalizeFilePath('C:\\Windows\\System32\\', true); // 'C:\Windows\System32'
normalizeFilePath('home/user/.bashrc'); // '/home/user/.bashrc'
normalizeFilePath('/home/user/../test'); // '/home/test'
```

:::

::: lang dart

```dart
normalizeFilePath('C:\\Windows\\System32\\', isWindows: true); // 'C:\Windows\System32'
normalizeFilePath('home/user/.bashrc'); // '/home/user/.bashrc'
normalizeFilePath('/home/user/../test'); // '/home/test'
```

:::

::: lang python

```python
normalizeFilePath('C:\\Windows\\System32\\', True) # 'C:\Windows\System32'
normalizeFilePath('home/user/.bashrc') # '/home/user/.bashrc'
normalizeFilePath('/home/user/../test') # '/home/test'
```

:::
