# getFileName
<NodeRequired en />

Returns the file name within the path.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' },
	{ name: 'withExtension', type: 'boolean', named: true, default: 'false', desc: 'Returns the name with extension.' }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
getFileName('/home/user/test.txt'); // 'test'
getFileName('/home/user/test.txt', true); // 'test.txt'
```

:::

::: lang dart

```dart
getFileName('/home/user/test.txt'); // 'test'
getFileName('/home/user/test.txt', withExtension: true); // 'test.txt'
```

:::

::: lang python

```python
getFileName('/home/user/test.txt') # 'test'
getFileName('/home/user/test.txt', True) # 'test.txt'
```

:::
