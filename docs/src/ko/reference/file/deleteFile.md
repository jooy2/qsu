# deleteFile <Lang js dart />

<NodeRequired ko />

지정된 경로에 있는 파일 또는 디렉터리를 삭제합니다. 파일이 경로에 존재하지 않으면 무시됩니다.

이 방법은 디렉터리 경로 삭제도 지원합니다. 디렉터리 내에 파일이 존재하는 경우, 해당 파일도 포함된 상태로 삭제됩니다.

## Parameters

- `filePath::string`: File or directory path

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

:::
