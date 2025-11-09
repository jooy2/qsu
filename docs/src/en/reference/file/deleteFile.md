# deleteFile <Lang js dart />

<NodeRequired en />

Delete files or directory in the specified path. If the file does not exist in the path, it is ignored.

This method also supports deleting directory paths. If files exist within the directory, they are included and removed.

## Parameters

- `filePath::string`: File or directory path

## Returns

> Promise::void

## Examples

::: code-group

```javascript [JavaScript]
await deleteFile('/home/user/text.txt');
```

```dart [Dart]
await deleteFile('/home/user/text.txt');
```

:::
