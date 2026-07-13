# joinFilePath <Lang js dart python />

<NodeRequired ko />

지정된 매개 변수 값에 따라 각 운영 체제에 대한 경로를 결합합니다.

Dart에서 `paths` 파라미터는 하나의 인자만 받아들이며, 인자는 List로 구성됩니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'isWindows', type: 'boolean', required: true, named: true, desc: 'Whether the target operating system to be checked is Windows' },
	{ name: 'paths', type: 'string[]', required: true, desc: 'A path value consisting of one or more strings. Omit the path separator and put it in the parameter.' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
joinFilePath(true, 'C:\\', 'Windows', 'System32'); // 'C:\Windows\System32'
joinFilePath(false, 'home', '/user', '.bashrc'); // '/home/user/.bashrc'
```

```dart [Dart]
joinFilePath(['C:\\', 'Windows', 'System32'], isWindows: true); // 'C:\Windows\System32'
joinFilePath(['home', '/user', '.bashrc']); // '/home/user/.bashrc'
```

```python [Python]
joinFilePath(True, 'C:\\', 'Windows', 'System32') # 'C:\Windows\System32'
joinFilePath(False, 'home', '/user', '.bashrc') # '/home/user/.bashrc'
```

:::
