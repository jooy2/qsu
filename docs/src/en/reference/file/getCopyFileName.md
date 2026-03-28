# getCopyFileName <Lang js />

<NodeRequired en />

This function scans an array containing a list of names and displays an alternative name if any duplicates are found. If no duplicates are found, the names are returned as is.

This works almost exactly like the file renaming logic in a file manager. If a duplicate name is detected, a number such as `(1)`, `(2)`, etc., is appended to the end of the filename.

If a file extension is included, it is retained and a number is added before it.

This function does not handle file paths.

## Parameters

- `fileName::string`: File name to rename
- `fileNameList::string[]`: An array containing the names of files to check for duplicates

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
getCopyFileName('abc.txt', ['abc.txt', 'def.txt']); // 'abc (1).txt'
getCopyFileName('abc.txt', ['abc.txt', 'abc (1).txt']); // 'abc (2).txt'
getCopyFileName('abc (1).txt', ['abc.txt', 'abc (1).txt']); // 'abc (1) (1).txt'
getCopyFileName('def.txt', ['abc.txt']); // 'def.txt'
```

:::
