# moveFile <Lang js dart />

<NodeRequired en />

Moves a file in the specified file path to another path.

## Parameters

- `filePath::string`: File or directory path
- `targetFilePath::string`: Path of file to move

## Returns

> Promise::void

## Examples

::: code-group

```javascript [JavaScript]
await moveFile('/home/user/text.txt', '/home/user/text2.txt');
```

```dart [Dart]
await moveFile('/home/user/text.txt', '/home/user/text2.txt');
```

:::
