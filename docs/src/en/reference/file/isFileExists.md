# isFileExists <Badge type="tip" text="JavaScript" />

<span class="node-required">Requires a Node.js runtime ('qsu/node')</span>

Returns `true` if the file at the given path exists.

## Parameters

- `filePath::string`

## Returns

> Promise:boolean

## Examples

```javascript
await isFileExists('text.txt'); // true
await isFileExists('not-exist.txt'); // false
```
