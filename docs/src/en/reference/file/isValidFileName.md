# isValidFileName <Lang js dart python />

<NodeRequired en />

Determines whether the passed path or filename is using a system-accepted string (Also check the valid file length). Returns false if the name is not available.

The entire name is validated including its extension, and Windows device names (`CON`, `PRN`, `AUX`, `NUL`, `COM1`–`COM9`, `LPT1`–`LPT9`) are rejected on the Windows path.

An empty name and any name carrying a control character (`U+0000`–`U+001F` or `U+007F`) are rejected on both paths. `NUL` in particular terminates the path in the system call underneath, so a name carrying one is silently truncated by the filesystem rather than refused.

On the Windows path a name ending in a dot or a space is rejected, because Windows strips it instead of reporting an error and the file that appears on disk is not the one that was asked for. Unix keeps them, so they stay valid with `unixType`.

The length limit is **255 bytes**, which is what ext4, APFS and NTFS enforce — not 255 characters. `'가'.repeat(100)` is 100 characters but 300 bytes, and cannot be created.

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
// An empty name, a control character, a trailing dot or space
isValidFileName(''); // false
isValidFileName('report.'); // false (valid on Unix)
// 255 bytes, not 255 characters
isValidFileName('가'.repeat(85)); // true (255 bytes)
isValidFileName('가'.repeat(86)); // false (258 bytes)
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
