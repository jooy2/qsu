# getFileInfo

<NodeRequired ko />

파일 또는 디렉토리 정보를 이해하기 쉬운 객체로 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' }
]" />

## Returns

<ReturnType :type="{ js: 'Promise<object>', dart: 'Future<FileInfo>' }" />

## Examples

::: lang js

```javascript
await getFileInfo('/home/user/test.txt');
```

:::

::: lang dart

```dart
await getFileInfo('/home/user/test.txt');
```

:::

::: lang python

```python
getFileInfo('/home/user/test.txt')
```

:::

Examples of returned values:

```json5
{
	success: true, // Whether the file stat import was successful
	isDirectory: false,
	ext: 'txt',
	size: 33,
	sizeHumanized: '33 Bytes',
	name: 'test.txt',
	dirname: 'user',
	path: '/home/user/test.txt',
	changed: 1652581984, // Unix timestamp
	modified: 1652581984 // Unix timestamp
}
```

Linux와 macOS에서 `changed`는 파일을 만든 시각이 아니라 파일의 메타데이터가 마지막으로 바뀐 시각(`ctime`)입니다.
