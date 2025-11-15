# tailFile <Lang js dart />

<NodeRequired en />

Returns the last line of the specified text file path. The `length` argument is the total number of lines to print. Default is `1`. The last line of newline characters is ignored.

## Parameters

- `filePath::string`: File or directory path
- `length::number` <DartNamed />: Number of lines of text to return

## Returns

> Promise::string|null

## Examples

::: code-group

```javascript [JavaScript]
await tailFile('/home/targets/hello.md', 2); // 'Good bye\n--- Hello End ---'
```

```dart [Dart]
await tailFile('/home/targets/hello.md', length: 2); // 'Good bye\n--- Hello End ---'
```

:::
