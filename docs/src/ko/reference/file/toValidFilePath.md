# toValidFilePath <Lang js dart python />

<NodeRequired ko />

경로에 있는 유효하지 않거나 불필요한 문자를 제거합니다.

`.`과 `..` 세그먼트는 해석되어 정리되며, 아무것도 남지 않는 경로는 루트를 반환합니다. 결과는 항상 절대 경로이고, `..`는 루트 위로 올라갈 수 없으므로 `../../etc/passwd`는 `/etc/passwd`가 됩니다.

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
