# joinFilePath <Lang js dart />

<NodeRequired ko />

지정된 매개 변수 값에 따라 각 운영 체제에 대한 경로를 결합합니다.

Dart에서 `paths` 파라미터는 하나의 인자만 받아들이며, 인자는 List로 구성됩니다.

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
