# toPosixFilePath <Badge type="tip" text="JavaScript" />

<span class="node-required">Requires a Node.js runtime ('qsu/node')</span>

Returns the given path as a path in POSIX format (usually used by Linux). For example, a Windows path will be converted to `/` instead of `\\`.

## Parameters

- `filePath::string`

## Returns

> string

## Examples

```javascript
toPosixFilePath('C:\\Windows\\System32'); // 'C:/Windows/System32'
```
