# getCopyFileName <Lang js dart python />

<NodeRequired en />

This function scans an array containing a list of names and displays an alternative name if any duplicates are found. If no duplicates are found, the names are returned as is.

This works almost exactly like the file renaming logic in a file manager. If a duplicate name is detected, a number such as `(1)`, `(2)`, etc., is appended to the end of the filename.

If a file extension is included, it is retained and a number is added before it. The original extension casing is kept as-is.

This function does not handle file paths.

Naming `n` files into one directory means calling this `n` times. Passing a `Set` lets it be read directly instead of rebuilt on every call, which is the difference between linear and quadratic over that loop.

## Parameters

<ParamsTable :rows="[
	{ name: 'fileName', type: 'string', required: true, desc: 'File name to rename' },
	{ name: 'fileNameList', type: 'string[] | Set<string>', required: true, desc: 'The names to check for duplicates. A `Set` is read as it is, so one can be reused across a loop; a list is copied into a `Set` on every call.' }
]" />

## Returns

> string

## Examples

::: lang js

```javascript
getCopyFileName('abc.txt', ['abc.txt', 'def.txt']); // 'abc (1).txt'
getCopyFileName('abc.txt', ['abc.txt', 'abc (1).txt']); // 'abc (2).txt'
getCopyFileName('abc (1).txt', ['abc.txt', 'abc (1).txt']); // 'abc (1) (1).txt'
getCopyFileName('def.txt', ['abc.txt']); // 'def.txt'
getCopyFileName('Report.PDF', ['Report.PDF']); // 'Report (1).PDF' (extension casing preserved)
```

:::

::: lang python

```python
getCopyFileName('abc.txt', ['abc.txt', 'def.txt']) # 'abc (1).txt'
getCopyFileName('abc.txt', ['abc.txt', 'abc (1).txt']) # 'abc (2).txt'
getCopyFileName('abc (1).txt', ['abc.txt', 'abc (1).txt']) # 'abc (1) (1).txt'
getCopyFileName('def.txt', ['abc.txt']) # 'def.txt'
getCopyFileName('Report.PDF', ['Report.PDF']) # 'Report (1).PDF' (extension casing preserved)
```

:::
