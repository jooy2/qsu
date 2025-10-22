# tailFile <Lang js />

<NodeRequired en />

Returns the last line of the specified text file path. The `length` argument is the total number of lines to print. Default is `1`. The last line of newline characters is ignored.

## Parameters

- `filePath::string`: File or directory path
- `length::number`: Number of lines of text to return

## Returns

> Promise::string|null

## Examples

```javascript
await tailFile('/home/targets/hello.md'); // '--- Hello End ---'
```
