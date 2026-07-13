# isFileHidden <Lang js python />

<NodeRequired en />

Checks whether a file or folder in the specified path is a hidden file. Determines system hidden files for Windows and the presence or absence of a `.`(dot) for Linux and macOS or other operating systems.

If Windows fails to get the file properties, it assumes the file is not hidden.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true },
	{ name: 'isWindows', type: 'boolean', default: 'false', desc: 'Whether the target operating system to be checked is Windows' }
]" />

## Returns

> Promise:boolean

## Examples

```javascript
await isFileHidden('text.txt'); // false
await isFileHidden('.hiddenFile'); // true
await isFileHidden('.hiddenFile', true); // false (Files with no hidden attribute applied in Windows)
```

```python
isFileHidden('text.txt') # False
isFileHidden('.hiddenFile') # True
isFileHidden('.hiddenFile', True) # False (Files with no hidden attribute applied in Windows)
```
