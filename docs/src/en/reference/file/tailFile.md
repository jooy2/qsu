# tailFile <Badge type="tip" text="JavaScript" />

<span class="node-required">Requires a Node.js runtime ('qsu/node')</span>

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
