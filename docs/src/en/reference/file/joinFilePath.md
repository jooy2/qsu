# joinFilePath <Lang js dart />

<NodeRequired en />

Combines paths for each operating system according to the given parameter values.

In Dart, the `paths` parameter accepts only one argument, which is a List.

## Parameters

- `isWindows::boolean` <DartNamed />: Whether the target operating system to be checked is Windows
- `paths::string[]`: A path value consisting of one or more strings. Omit the path separator and put it in the parameter.

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
joinFilePath(true, 'C:\\', 'Windows', 'System32'); // 'C:\Windows\System32'
joinFilePath(false, 'home', '/user', '.bashrc'); // '/home/user/.bashrc'
```

```dart [Dart]
joinFilePath(['C:\\', 'Windows', 'System32'], isWindows: true); // 'C:\Windows\System32'
joinFilePath(['home', '/user', '.bashrc']); // '/home/user/.bashrc'
```

:::
