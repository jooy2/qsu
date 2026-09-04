# headFile <Lang js dart python />

<NodeRequired en />

Returns the first line of the specified text file path. The `length` argument is the total number of lines to print. Default is `1`.

Only as much of the file as the requested lines need is read, so the cost does not follow the size of the file.

A line breaks on `\n`, `\r\n` or a lone `\r`. Bytes that are not valid UTF-8 become the replacement character `U+FFFD` instead of raising, and a leading byte order mark is kept.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' },
	{ name: 'length', type: 'number', named: true, default: '1', desc: 'Number of lines of text to return' }
]" />

## Returns

> Promise::string|null

## Examples

::: lang js

```javascript
await headFile('/home/targets/hello.md', 2); // '# Hello, World!\nSecond line'
```

:::

::: lang dart

```dart
await headFile('/home/targets/hello.md', length: 2); // '# Hello, World!\nSecond line'
```

:::

::: lang python

```python
headFile('/home/targets/hello.md', 2) # '# Hello, World!\nSecond line'
```

:::
