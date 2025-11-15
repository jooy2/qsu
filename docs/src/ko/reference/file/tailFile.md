# tailFile <Lang js dart />

<NodeRequired ko />

지정된 텍스트 파일 경로의 마지막 줄을 반환합니다. `length` 인수는 인쇄할 총 줄 수입니다. 기본값은 `1`입니다. 줄 바꿈 문자의 마지막 줄은 무시됩니다.

## Parameters

- `filePath::string`: File or directory path
- `length::number` <DartNamed />: Number of lines of text to return

## Returns

> Promise::string|null

## Examples

::: code-group

```javascript [JavaScript]
await tailFile('/home/targets/hello.md', 2); // 'Good bye\n--- Hello End ---'
```

```dart [Dart]
await tailFile('/home/targets/hello.md', length: 2); // 'Good bye\n--- Hello End ---'
```

:::
