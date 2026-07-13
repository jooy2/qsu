# toValidFilePath <Lang js dart python />

<NodeRequired ko />

경로에 있는 유효하지 않거나 불필요한 문자를 제거합니다.

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
```

```dart [Dart]
toValidFilePath('C:\\Windows\\System32\\', isWindows: true); // 'C:\Windows\System32'
toValidFilePath('home/user/.bashrc'); // '/home/user/.bashrc'
```

```python [Python]
toValidFilePath('C:\\Windows\\System32\\', True) # 'C:\Windows\System32'
toValidFilePath('home/user/.bashrc') # '/home/user/.bashrc'
```

:::
