# joinFilePath <Lang js dart python />

<NodeRequired en />

Combines paths for each operating system according to the given parameter values.

## Parameters

<ParamsTable :rows="[
	{ name: 'isWindows', type: 'boolean', required: true, named: true, desc: 'Whether the target operating system to be checked is Windows' },
	{ name: 'paths', type: '...string[]', required: true, desc: 'A path value consisting of one or more strings. Omit the path separator and put it in the parameter.' }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
joinFilePath(true, 'C:\\', 'Windows', 'System32'); // 'C:\Windows\System32'
joinFilePath(false, 'home', '/user', '.bashrc'); // '/home/user/.bashrc'
```

:::

::: lang dart

```dart
joinFilePath(['C:\\', 'Windows', 'System32'], isWindows: true); // 'C:\Windows\System32'
joinFilePath(['home', '/user', '.bashrc']); // '/home/user/.bashrc'
```

:::

::: lang python

```python
joinFilePath(True, 'C:\\', 'Windows', 'System32') # 'C:\Windows\System32'
joinFilePath(False, 'home', '/user', '.bashrc') # '/home/user/.bashrc'
```

:::
