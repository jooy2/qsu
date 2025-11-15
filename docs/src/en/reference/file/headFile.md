# headFile <Lang js dart />

<NodeRequired en />

Returns the first line of the specified text file path. The `length` argument is the total number of lines to print. Default is `1`.

## Parameters

- `filePath::string`: File or directory path
- `length::number` <DartNamed />: Number of lines of text to return

## Returns

> Promise::string|null

## Examples

::: code-group

```javascript [JavaScript]
await headFile('/home/targets/hello.md'); // '# Hello, World!'
```

```dart [Dart]

await headFile('/home/targets/hello.md'); // '# Hello, World!'
```

:::
