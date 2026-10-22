# createFileOfSize

<NodeRequired en />

Creates a file with the specified size in bytes. A size of `0` creates an empty file, and a negative size raises an error.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' },
	{ name: 'size', type: 'number', required: true, named: true, desc: 'Size of the file to be created (Dummy data is filled as much as the given size)' }
]" />

## Returns

<ReturnType type="Promise<boolean>" />

## Examples

::: lang js

```javascript
await createFileOfSize('/home/user/test.txt', 100000);
// A size of 0 creates an empty file; a negative size throws
await createFileOfSize('/home/user/empty.txt', 0);
```

:::

::: lang dart

```dart
await createFileOfSize('/home/user/test.txt', size: 100000);
// A size of 0 creates an empty file; a negative size throws
await createFileOfSize('/home/user/empty.txt', size: 0);
```

:::

::: lang python

```python
createFileOfSize('/home/user/test.txt', 100000)
# A size of 0 creates an empty file; a negative size raises
createFileOfSize('/home/user/empty.txt', 0)
```

:::
