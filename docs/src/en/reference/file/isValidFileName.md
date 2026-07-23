# isValidFileName <Lang js dart python />

<NodeRequired en />

Determines whether the passed path or filename is using a system-accepted string (Also check the valid file length). Returns false if the name is not available.

The entire name is validated including its extension, and Windows device names (`CON`, `PRN`, `AUX`, `NUL`, `COM1`–`COM9`, `LPT1`–`LPT9`) are rejected on the Windows path.

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
// Windows device names stay reserved even with an extension
isValidFileName('nul.txt'); // false
isValidFileName('nul.txt', true); // true
```

```dart [Dart]
isValidFileName('C:\\Windows\\System32*'); // false
isValidFileName('/home/user/.bashrc', unixType: true); // true
// Windows device names stay reserved even with an extension
isValidFileName('nul.txt'); // false
isValidFileName('nul.txt', unixType: true); // true
```

```python [Python]
isValidFileName('C:\\Windows\\System32*') # False
isValidFileName('/home/user/.bashrc', True) # True
# Windows device names stay reserved even with an extension
isValidFileName('nul.txt') # False
isValidFileName('nul.txt', True) # True
```

:::
