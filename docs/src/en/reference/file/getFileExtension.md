# getFileExtension <Lang js dart />

<NodeRequired en />

Returns the file extension from the given file path. An empty string value is returned for files without extension.

## Parameters

- `filePath::string`: File or directory path

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
getFileExtension('/home/user/test.txt'); // 'txt'
getFileExtension('/home/user/test.txt.sample'); // 'sample'
getFileExtension('C:\\test\\txt.png'); // 'png'
```

```dart [Dart]
getFileExtension('/home/user/test.txt'); // 'txt'
getFileExtension('/home/user/test.txt.sample'); // 'sample'
getFileExtension('C:\\test\\txt.png'); // 'png'
```

:::
