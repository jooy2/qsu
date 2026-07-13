# getFilePathLevel <Lang js dart python />

<NodeRequired en />

Determine how many steps the current path is. The root path (`/` or `C:\`) begins with step 1.

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
```

```dart [Dart]
// Include 'C:\' root path
getFilePathLevel('C:\\Windows\\System32'); // 3
// Include '/' root path
getFilePathLevel('/home/user'); // 3
```

```python [Python]
# Include 'C:\' root path
getFilePathLevel('C:\\Windows\\System32') # 3
# Include '/' root path
getFilePathLevel('/home/user') # 3
```

:::
