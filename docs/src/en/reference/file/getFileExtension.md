# getFileExtension <Lang js dart />

<NodeRequired en />

Returns the file extension from the given file path. An empty string value is returned for files without extension.

## Parameters

- `filePath::string`: File or directory path
- `isWindows::boolean` <DartNamed />: Whether the target operating system to be checked is Windows

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
getFileExtension('/home/user/test.txt'); // 'txt'
getFileExtension('/home/user/test.txt.sample'); // 'sample'
getFileExtension('C:\\test\\txt.png', true); // 'png'
```

```dart [Dart]
getFileExtension('/home/user/test.txt'); // 'txt'
getFileExtension('/home/user/test.txt.sample'); // 'sample'
getFileExtension('C:\\test\\txt.png', isWindows: true); // 'png'
```

:::
