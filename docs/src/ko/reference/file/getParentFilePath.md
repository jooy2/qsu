# getParentFilePath <Lang js dart />

<NodeRequired ko />

지정된 경로보다 한 단계 위의 상위 경로를 반환합니다.

## Parameters

- `filePath::string`
- `isWindows::boolean` <DartNamed />: Whether the target operating system to be checked is Windows

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
getParentFilePath('C:\\Windows\\System32', true); // 'C:\Windows'
getParentFilePath('/home/user/text.txt'); // '/home/user'
```

```dart [Dart]
getParentFilePath('C:\\Windows\\System32', isWindows: true); // 'C:\Windows'
getParentFilePath('/home/user/text.txt'); // '/home/user'
```

:::
