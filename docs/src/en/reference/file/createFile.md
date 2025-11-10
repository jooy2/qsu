# createFile <Lang js dart />

<NodeRequired en />

Create a file of empty data. If the same file already exists, it is ignored.

## Parameters

- `filePath::string`: File or directory path

## Returns

> Promise::void

## Examples

::: code-group

```javascript [JavaScript]
await createFile('/home/user/test.txt');
```

```dart [Dart]
await createFile('/home/user/test.txt');
```

:::
