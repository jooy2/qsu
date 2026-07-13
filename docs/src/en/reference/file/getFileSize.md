# getFileSize <Lang js dart python />

<NodeRequired en />

Calculates the size of the file at the given path.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
getFileSize('/home/user/test.txt'); // 300
```

```dart [Dart]

getFileSize('/home/user/test.txt'); // 300
```

```python [Python]
getFileSize('/home/user/test.txt') # 300
```

:::
