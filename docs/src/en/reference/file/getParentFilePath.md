# getParentFilePath <Lang js dart />

<NodeRequired en />

Returns the parent path one level above the given path.

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
