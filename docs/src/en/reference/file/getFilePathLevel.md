# getFilePathLevel <Lang js dart python />

<NodeRequired en />

Determine how many steps the current path is. The root path (`/` or `C:\`) begins with step 1.

A trailing separator is ignored, so `/home/user/` and `/home/user` report the same level.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true }
]" />

## Returns

> string

## Examples

::: lang js

```javascript
// Include 'C:\' root path
getFilePathLevel('C:\\Windows\\System32'); // 3
// Include '/' root path
getFilePathLevel('/home/user'); // 3
// A trailing separator does not add a level
getFilePathLevel('/home/user/'); // 3
```

:::

::: lang dart

```dart
// Include 'C:\' root path
getFilePathLevel('C:\\Windows\\System32'); // 3
// Include '/' root path
getFilePathLevel('/home/user'); // 3
// A trailing separator does not add a level
getFilePathLevel('/home/user/'); // 3
```

:::

::: lang python

```python
# Include 'C:\' root path
getFilePathLevel('C:\\Windows\\System32') # 3
# Include '/' root path
getFilePathLevel('/home/user') # 3
# A trailing separator does not add a level
getFilePathLevel('/home/user/') # 3
```

:::
