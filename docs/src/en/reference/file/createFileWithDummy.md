# createFileWithDummy <Badge type="tip" text="JavaScript" />

Creates a file with the specified size in bytes.

## Parameters

- `filePath::string`: File or directory path
- `size::number`: Size of the file to be created (Dummy data is filled as much as the given size)

## Returns

> Promise::void

## Examples

```javascript
await createFileWithDummy('/home/user/test.txt', 100000);
```
