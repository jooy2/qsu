# isValidFileName <Lang js dart />

<NodeRequired en />

Determines whether the passed path or filename is using a system-accepted string (Also check the valid file length). Returns false if the name is not available.

## Parameters

- `filePath::string`: File or directory path
- `unixType::boolean?` <DartNamed />: Passes true if the file type is unix type.

## Returns

> boolean

## Examples

::: code-group

```javascript [JavaScript]
isValidFileName('C:\\Windows\\System32*'); // false
isValidFileName('/home/user/.bashrc', true); // true
```

```dart [Dart]
isValidFileName('C:\\Windows\\System32*'); // false
isValidFileName('/home/user/.bashrc', unixType: true); // true
```

:::
