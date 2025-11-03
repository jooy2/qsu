# getFileName <Lang js dart />

<NodeRequired en />

Returns the file name within the path.

## Parameters

- `filePath::string`: File or directory path
- `withExtension:boolean?|false` <DartNamed />: Returns the name with extension.

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
getFileName('/home/user/test.txt'); // 'test'
getFileName('/home/user/test.txt', true); // 'test.txt'
```

```dart [Dart]
getFileName('/home/user/test.txt'); // 'test'
getFileName('/home/user/test.txt', withExtension: true); // 'test.txt'
```

:::
