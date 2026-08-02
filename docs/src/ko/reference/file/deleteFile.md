# deleteFile <Lang js dart python />

<NodeRequired ko />

지정된 경로에 있는 파일 또는 디렉터리를 삭제합니다. 파일이 경로에 존재하지 않으면 무시됩니다.

이 방법은 디렉터리 경로 삭제도 지원합니다. 디렉터리 내에 파일이 존재하는 경우, 해당 파일도 포함된 상태로 삭제됩니다.

심볼릭 링크는 따라가지 않고 링크 자체만 삭제하므로, 링크가 가리키는 디렉터리는 그대로 남습니다. 경로가 비어 있거나 공백뿐이면 아무 작업도 하지 않습니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' }
]" />

## Returns

> Promise::void

## Examples

::: code-group

```javascript [JavaScript]
await deleteFile('/home/user/text.txt');
```

```dart [Dart]
await deleteFile('/home/user/text.txt');
```

```python [Python]
deleteFile('/home/user/text.txt')
```

:::
