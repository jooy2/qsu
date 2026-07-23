# getFilePathLevel <Lang js dart python />

<NodeRequired ko />

현재 경로가 몇 단계인지 결정합니다. 루트 경로(`/` 또는 `C:\`)는 1단계로 시작합니다.

후행 구분자는 무시되므로 `/home/user/`와 `/home/user`는 같은 단계를 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
// Include 'C:\' root path
getFilePathLevel('C:\\Windows\\System32'); // 3
// Include '/' root path
getFilePathLevel('/home/user'); // 3
// 후행 구분자는 단계를 늘리지 않습니다
getFilePathLevel('/home/user/'); // 3
```

```dart [Dart]
// Include 'C:\' root path
getFilePathLevel('C:\\Windows\\System32'); // 3
// Include '/' root path
getFilePathLevel('/home/user'); // 3
// 후행 구분자는 단계를 늘리지 않습니다
getFilePathLevel('/home/user/'); // 3
```

```python [Python]
# Include 'C:\' root path
getFilePathLevel('C:\\Windows\\System32') # 3
# Include '/' root path
getFilePathLevel('/home/user') # 3
# 후행 구분자는 단계를 늘리지 않습니다
getFilePathLevel('/home/user/') # 3
```

:::
