# getParentFilePath <Lang js dart python />

<NodeRequired ko />

지정된 경로보다 한 단계 위의 상위 경로를 반환합니다.

후행 구분자는 무시되므로 `/home/user/`와 `/home/user`의 상위 경로는 모두 `/home`입니다. 세그먼트가 하나뿐인 경로는 루트로 해석됩니다.

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
getParentFilePath('C:\\Windows\\System32', true); // 'C:\Windows'
getParentFilePath('/home/user/text.txt'); // '/home/user'
getParentFilePath('relative/path'); // '/relative'
getParentFilePath('/home/user/'); // '/home'
```

:::

::: lang dart

```dart
getParentFilePath('C:\\Windows\\System32', isWindows: true); // 'C:\Windows'
getParentFilePath('/home/user/text.txt'); // '/home/user'
getParentFilePath('relative/path'); // '/relative'
getParentFilePath('/home/user/'); // '/home'
```

:::

::: lang python

```python
getParentFilePath('C:\\Windows\\System32', True) # 'C:\Windows'
getParentFilePath('/home/user/text.txt') # '/home/user'
getParentFilePath('relative/path') # '/relative'
getParentFilePath('/home/user/') # '/home'
```

:::
