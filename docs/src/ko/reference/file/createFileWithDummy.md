# createFileWithDummy <Lang js dart />

<NodeRequired ko />

지정된 크기의 파일을 바이트 단위로 만듭니다.

## Parameters

- `filePath::string`: File or directory path
- `size::number` <DartNamed />: Size of the file to be created (Dummy data is filled as much as the given size)

## Returns

> Promise::void

## Examples

::: code-group

```javascript [JavaScript]
await createFileWithDummy('/home/user/test.txt', 100000);
```

```dart [Dart]
await createFileWithDummy('/home/user/test.txt', size: 100000);
```

:::
