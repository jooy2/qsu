# getFileExtension
<NodeRequired ko />

지정된 파일 경로에서 파일 확장자를 반환합니다. 확장자가 없는 파일의 경우 빈 문자열 값이 반환됩니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' }
]" />

## Returns

<ReturnType type="string | null" />

## Examples

::: lang js

```javascript
getFileExtension('/home/user/test.txt'); // 'txt'
getFileExtension('/home/user/test.txt.sample'); // 'sample'
getFileExtension('C:\\test\\txt.png'); // 'png'
```

:::

::: lang dart

```dart
getFileExtension('/home/user/test.txt'); // 'txt'
getFileExtension('/home/user/test.txt.sample'); // 'sample'
getFileExtension('C:\\test\\txt.png'); // 'png'
```

:::

::: lang python

```python
getFileExtension('/home/user/test.txt') # 'txt'
getFileExtension('/home/user/test.txt.sample') # 'sample'
getFileExtension('C:\\test\\txt.png') # 'png'
```

:::
