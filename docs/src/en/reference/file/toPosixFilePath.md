# toPosixFilePath <Lang js dart />

<NodeRequired en />

Returns the given path as a path in POSIX format (usually used by Linux). For example, a Windows path will be converted to `/` instead of `\\`.

## Parameters

- `filePath::string`

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
toPosixFilePath('C:\\Windows\\System32'); // 'C:/Windows/System32'
```

```dart [Dart]
toPosixFilePath('C:\\Windows\\System32'); // 'C:/Windows/System32'
```

:::
