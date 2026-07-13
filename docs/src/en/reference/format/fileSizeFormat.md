# fileSizeFormat <Lang js dart python />

Returns the given file size (in bytes) as a human-readable string.

## Parameters

<ParamsTable :rows="[
	{ name: 'bytes', type: 'number', required: true, desc: 'Converts it to a human-friendly string via the bytes provided here.' },
	{ name: 'decimals', type: 'number', default: '2', named: true, desc: 'Specifies the number of decimal places to represent.' },
	{ name: 'ceil', type: 'boolean', default: 'false', named: true, desc: 'If this value is `true`, the decimal point is removed and the number is rounded up.' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
fileSizeFormat(1000000); // '976.56 KB'
fileSizeFormat(100000000, 3); // '95.367 MB'
fileSizeFormat(100000000, 0, true); // '96 MB'
```

```dart [Dart]
fileSizeFormat(1000000); // '976.56 KB'
fileSizeFormat(100000000, decimals: 3); // '95.367 MB'
fileSizeFormat(100000000, ceil: true); // '96 MB'
```

```python [Python]
fileSizeFormat(1000000)  # '976.56 KB'
fileSizeFormat(100000000, 3)  # '95.367 MB'
fileSizeFormat(100000000, 0, True)  # '96 MB'
```

:::
