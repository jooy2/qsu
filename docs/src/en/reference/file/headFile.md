# headFile <Lang js dart python />

<NodeRequired en />

Returns the first line of the specified text file path. The `length` argument is the total number of lines to print. Default is `1`.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' },
	{ name: 'length', type: 'number', named: true, default: '1', desc: 'Number of lines of text to return' }
]" />

## Returns

> Promise::string|null

## Examples

::: code-group

```javascript [JavaScript]
await headFile('/home/targets/hello.md', 2); // '# Hello, World!\nSecond line'
```

```dart [Dart]
await headFile('/home/targets/hello.md', length: 2); // '# Hello, World!\nSecond line'
```

```python [Python]
headFile('/home/targets/hello.md', 2) # '# Hello, World!\nSecond line'
```

:::
