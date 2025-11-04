# toValidFilePath <Lang js dart />

<NodeRequired ko />

경로에 있는 유효하지 않거나 불필요한 문자를 제거합니다.

## Parameters

- `filePath::string`
- `isWindows::boolean` <DartNamed />: Whether the target operating system to be checked is Windows

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
toValidFilePath('C:\\Windows\\System32\\', true); // 'C:\Windows\System32'
toValidFilePath('home/user/.bashrc'); // '/home/user/.bashrc'
```

```dart [Dart]
toValidFilePath('C:\\Windows\\System32\\', isWindows: true); // 'C:\Windows\System32'
toValidFilePath('home/user/.bashrc'); // '/home/user/.bashrc'
```

:::
