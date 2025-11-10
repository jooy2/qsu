# createFile <Lang js dart />

<NodeRequired ko />

빈 데이터로 된 파일을 만듭니다. 같은 파일이 이미 존재하는 경우, 그 파일은 무시됩니다.

## Parameters

- `filePath::string`: File or directory path

## Returns

> Promise::void

## Examples

::: code-group

```javascript [JavaScript]
await createFile('/home/user/test.txt');
```

```dart [Dart]
await createFile('/home/user/test.txt');
```

:::
