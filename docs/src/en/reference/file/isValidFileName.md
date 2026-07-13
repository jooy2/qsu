# isValidFileName <Lang js dart python />

<NodeRequired en />

Determines whether the passed path or filename is using a system-accepted string (Also check the valid file length). Returns false if the name is not available.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' },
	{ name: 'unixType', type: 'boolean', named: true, desc: 'Passes true if the file type is unix type.' }
]" />

## Returns

> boolean

## Examples

::: code-group

```javascript [JavaScript]
isValidFileName('C:\\Windows\\System32*'); // false
isValidFileName('/home/user/.bashrc', true); // true
```

```dart [Dart]
isValidFileName('C:\\Windows\\System32*'); // false
isValidFileName('/home/user/.bashrc', unixType: true); // true
```

```python [Python]
isValidFileName('C:\\Windows\\System32*') # False
isValidFileName('/home/user/.bashrc', True) # True
```

:::
