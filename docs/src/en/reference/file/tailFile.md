# tailFile
<NodeRequired en />

Returns the last line of the specified text file path. The `length` argument is the total number of lines to print. Default is `1`. The last line of newline characters is ignored.

The file is read backwards from its end, a chunk at a time, until the requested lines are in hand. The cost follows the number of lines asked for rather than the size of the file, so the last line of a 10 GB log costs the same as the last line of a small one.

A line breaks on `\n`, `\r\n` or a lone `\r`. Bytes that are not valid UTF-8 become the replacement character `U+FFFD` instead of raising, and a leading byte order mark is kept.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' },
	{ name: 'length', type: 'number', named: true, default: '1', desc: 'Number of lines of text to return' }
]" />

## Returns

<ReturnType type="Promise<string | null>" />

## Examples

::: lang js

```javascript
await tailFile('/home/targets/hello.md', 2); // 'Good bye\n--- Hello End ---'
```

:::

::: lang dart

```dart
await tailFile('/home/targets/hello.md', length: 2); // 'Good bye\n--- Hello End ---'
```

:::

::: lang python

```python
tailFile('/home/targets/hello.md', 2) # 'Good bye\n--- Hello End ---'
```

:::
