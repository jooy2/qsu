# createDirectory <Lang js dart />

<NodeRequired en />

Creates a directory with the specified path. Ignores the operation if the directory already exists.

## Parameters

- `filePath::string`: File or directory path
- `recursive::boolean?|true` <DartNamed />: Recursively creates all directories in the given path.

## Returns

> void

## Examples

::: code-group

```javascript [JavaScript]
createDirectory('/home/user/a/b/c');
```

```dart [Dart]
createDirectory('/home/user/a/b/c');
```

:::
