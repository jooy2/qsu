# createDirectory <Lang js dart />

<NodeRequired ko />

지정된 경로로 디렉토리를 생성합니다. 디렉토리가 이미 존재하는 경우, 이 작업은 무시됩니다.

## Parameters

- `filePath::string`: File or directory path
- `recursive::boolean?|true` <DartNamed />: Recursively creates all directories in the given path.

## Returns

> void

## Examples

::: code-group

```javascript [JavaScript]
createDirectory('/home/user/a/b/c');
```

```dart [Dart]
createDirectory('/home/user/a/b/c');
```

:::
