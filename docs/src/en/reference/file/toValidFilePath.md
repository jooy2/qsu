# toValidFilePath <Lang js dart />

<NodeRequired en />

Remove invalid or unnecessary characters in the path.

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
