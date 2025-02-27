---
title: File
order: 100
---

# API: File

## `createDirectory`

Creates a directory with the specified path. Ignores the operation if the directory already exists.

### Parameters

- `filePath::string`: File or directory path
- `recursive::boolean?|true`: Recursively creates all directories in the given path.

### Returns

> void

### Examples

```javascript
createDirectory('/home/user/a/b/c');
```

## `createFile`

Create a file of empty data. If the same file already exists, it is ignored.

### Parameters

- `filePath::string`: File or directory path

### Returns

> Promise::void

### Examples

```javascript
await createFile('/home/user/test.txt');
```

## `createFileWithDummy`

Creates a file with the specified size in bytes.

### Parameters

- `filePath::string`: File or directory path
- `size::number`: Size of the file to be created (Dummy data is filled as much as the given size)

### Returns

> Promise::void

### Examples

```javascript
await createFileWithDummy('/home/user/test.txt', 100000);
```

## `deleteFile`

Delete files or directory in the specified path. If the file does not exist in the path, it is ignored.

This method also supports deleting directory paths. If files exist within the directory, they are included and removed.

### Parameters

- `filePath::string`: File or directory path

### Returns

> Promise::void

### Examples

```javascript
await deleteFile('/home/user/text.txt');
```

## `deleteAllFileFromDirectory`

Deletes all files in the specified directory path. However, the directory is preserved.

### Parameters

- `directoryPath::string`: Directory path

### Returns

> Promise::void

### Examples

```javascript
await deleteAllFileFromDirectory('/home/user/Downloads');
```

## `getFileExtension`

Returns the file extension from the given file path. An empty string value is returned for files without extension.

### Parameters

- `filePath::string`: File or directory path
- `isWindows::boolean`: Whether the target operating system to be checked is Windows

### Returns

> string

### Examples

```javascript
getFileExtension('/home/user/test.txt'); // 'txt'
getFileExtension('/home/user/test.txt.sample'); // 'sample'
```

## `getFileHash`

Returns the file in the specified path as a value hashed by a specific algorithm. The default algorithm is `md5`. This method uses a `Promise` to return a valid hash value.

### Parameters

- `filePath::string`: File path
- `algorithm::'md5'|'sha1'|'sha256'|'sha512'`: OpenSSL algorithm to be used for file hashing

### Returns

> Promise::string

### Examples

```javascript
await getFileHash('/home/user/text.txt', 'sha1'); // '38851813f75627d581c593f3ccfb7061dd013fbd'
```

## `getFileInfo`

Returns file or directory information as an easy-to-understand object.

### Parameters

- `filePath::string`: File or directory path

### Returns

> Promise::string

### Examples

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

## `getFileName`

Returns the file name within the path.

### Parameters

- `filePath::string`: File or directory path
- `withExtension:boolean?|false`: Returns the name with extension.

### Returns

> string

### Examples

```javascript
getFileName('/home/user/test.txt'); // 'test'
getFileName('/home/user/test.txt', true); // 'test.txt'
```

## `getFilePathLevel`

Determine how many steps the current path is. The root path (`/` or `C:\`) begins with step 1.

### Parameters

- `filePath::string`

### Returns

> string

### Examples

```javascript
// Include 'C:\' root path
getFilePathLevel('C:\\Windows\\System32'); // 3
// Include '/' root path
getFilePathLevel('/home/user'); // 3
```

## `getFileSize`

Returns the given byte argument as a human-friendly string.

### Parameters

- `bytes::number`: Converts it to a human-friendly string via the bytes provided here.
- `decimals::number (Default: 2)`: Specifies the number of decimal places to represent.

### Returns

> string

### Examples

```javascript
getFileSize(1000000); // '976.56 KB'
getFileSize(100000000, 3); // '95.367 MB'
```

## `getParentFilePath`

Returns the parent path one level above the given path.

### Parameters

- `filePath::string`

### Returns

> string

### Examples

```javascript
getParentFilePath('C:\\Windows\\System32', true); // 'C:\Windows'
getParentFilePath('/home/user/text.txt'); // '/home/user'
```

## `headFile`

Returns the first line of the specified text file path. The `length` argument is the total number of lines to print. Default is `1`.

### Parameters

- `filePath::string`: File or directory path
- `length::number`: Number of lines of text to return

### Returns

> Promise::string|null

### Examples

```javascript
await headFile('/home/targets/hello.md'); // '# Hello, World!'
```

## `isFileExists`

Returns `true` if the file at the given path exists.

### Parameters

- `filePath::string`

### Returns

> Promise:boolean

### Examples

```javascript
await isFileExists('text.txt'); // true
await isFileExists('not-exist.txt'); // false
```

## `isFileHidden`

Checks whether a file or folder in the specified path is a hidden file. Determines system hidden files for Windows and the presence or absence of a `.`(dot) for Linux and macOS or other operating systems.

If Windows fails to get the file properties, it assumes the file is not hidden.

### Parameters

- `filePath::string`
- `isWindows::boolean`: Whether the target operating system to be checked is Windows

### Returns

> Promise:boolean

### Examples

```javascript
await isFileHidden('text.txt'); // false
await isFileHidden('.hiddenFile'); // true
await isFileHidden('.hiddenFile', true); // false (Files with no hidden attribute applied in Windows)
```

## `isValidFileName`

Determines whether the passed path or filename is using a system-accepted string (Also check the valid file length). Returns false if the name is not available.

### Parameters

- `filePath::string`: File or directory path
- `unixType::boolean?`: Passes true if the file type is unix type.

### Returns

> boolean

### Examples

```javascript
isValidFileName('C:\\Windows\\System32*'); // false
isValidFileName('/home/user/.bashrc', true); // true
```

## `joinFilePath`

Combines paths for each operating system according to the given parameter values.

### Parameters

- `isWindows::boolean`: Whether the target operating system to be checked is Windows
- `paths::string[]`: A path value consisting of one or more strings. Omit the path separator and put it in the parameter.

### Returns

> string

### Examples

```javascript
joinFilePath(true, 'C:\\', 'Windows', 'System32'); // 'C:\Windows\System32'
joinFilePath(false, 'home', '/user', '.bashrc'); // '/home/user/.bashrc'
```

## `moveFile`

Moves a file in the specified file path to another path.

### Parameters

- `filePath::string`: File or directory path
- `targetFilePath::string`: Path of file to move

### Returns

> Promise::void

### Examples

```javascript
await moveFile('/home/user/text.txt', '/home/user/text2.txt');
```

## `normalizeFile`

Returns the file name within the path.

### Parameters

- `filePath::string`: File or directory path
- `normalizationForm::'NFC'|'NFD'|'NFKC'|'NFKD'|undefined`: Normalization method (If value is `undefined`, `NFC` is used.)

### Returns

> string

### Examples

```javascript
normalizeFile('안녕하세요Hello.txt', 'NFC'); // '안녕하세요Hello.txt'
normalizeFile('안녕하세요Hello.txt', 'NFD'); // '안녕하세요Hello.txt'
```

## `tailFile`

Returns the last line of the specified text file path. The `length` argument is the total number of lines to print. Default is `1`. The last line of newline characters is ignored.

### Parameters

- `filePath::string`: File or directory path
- `length::number`: Number of lines of text to return

### Returns

> Promise::string|null

### Examples

```javascript
await tailFile('/home/targets/hello.md'); // '--- Hello End ---'
```

## `toPosixFilePath`

Returns the given path as a path in POSIX format (usually used by Linux). For example, a Windows path will be converted to `/` instead of `\\`.

### Parameters

- `filePath::string`

### Returns

> string

### Examples

```javascript
toPosixFilePath('C:\\Windows\\System32'); // 'C:/Windows/System32'
```

## `toValidFilePath`

Remove invalid or unnecessary characters in the path.

### Parameters

- `filePath::string`
- `isWindows::boolean`: Whether the target operating system to be checked is Windows

### Returns

> string

### Examples

```javascript
toValidFilePath('C:\\Windows\\System32\\', true); // 'C:\Windows\System32'
toValidFilePath('home/user/.bashrc'); // '/home/user/.bashrc'
```
