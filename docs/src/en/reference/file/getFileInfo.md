# getFileInfo <Badge type="tip" text="JavaScript" />

Returns file or directory information as an easy-to-understand object.

## Parameters

- `filePath::string`: File or directory path

## Returns

> Promise::string

## Examples

```javascript
await getFileInfo('/home/user/test.txt');
```

Examples of returned values:

```json5
{
	success: true, // Whether the file stat import was successful
	isDirectory: false,
	ext: 'txt',
	size: 33,
	sizeHumanized: '33 Bytes',
	name: 'test.txt',
	dirname: 'user',
	path: '/home/user/test.txt',
	created: 1652581984, // Unix timestamp
	modified: 1652581984 // Unix timestamp
}
```
