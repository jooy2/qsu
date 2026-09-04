# moveFile
<NodeRequired ko />

지정된 파일 경로에 있는 파일을 다른 경로로 이동합니다. 디렉터리도 그 안의 내용과 함께 같은 방식으로 이동합니다.

이름 변경(rename)은 파일 시스템 경계를 넘을 수 없으며, 임시 디렉터리 밖으로 옮기거나 마운트된 볼륨 또는 다른 드라이브로 옮기는 경우가 여기에 해당합니다. 운영체제가 이를 알려오면 대상 경로로 복사한 뒤 원본을 삭제하므로 이동은 그대로 완료됩니다.

경로가 비어 있거나 공백뿐이면 아무 작업도 하지 않습니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' },
	{ name: 'targetFilePath', type: 'string', required: true, desc: 'Path of file to move' }
]" />

## Returns

<ReturnType type="Promise<void>" />

## Examples

::: lang js

```javascript
await moveFile('/home/user/text.txt', '/home/user/text2.txt');
```

:::

::: lang dart

```dart
await moveFile('/home/user/text.txt', '/home/user/text2.txt');
```

:::

::: lang python

```python
moveFile('/home/user/text.txt', '/home/user/text2.txt')
```

:::
