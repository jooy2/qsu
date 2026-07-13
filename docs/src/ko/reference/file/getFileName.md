# getFileName <Lang js dart python />

<NodeRequired ko />

경로 내의 파일 이름을 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' },
	{ name: 'withExtension', type: 'boolean', named: true, default: 'false', desc: 'Returns the name with extension.' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
getFileName('/home/user/test.txt'); // 'test'
getFileName('/home/user/test.txt', true); // 'test.txt'
```

```dart [Dart]
getFileName('/home/user/test.txt'); // 'test'
getFileName('/home/user/test.txt', withExtension: true); // 'test.txt'
```

```python [Python]
getFileName('/home/user/test.txt') # 'test'
getFileName('/home/user/test.txt', True) # 'test.txt'
```

:::
