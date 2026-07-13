# md5Hash <Lang dart js python />

<NodeRequired en />

Converts String data to md5 hash value and returns it.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'encoding', type: `'hex' | 'base64' | 'base64url' | 'binary'`, named: true, default: `'hex'` }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
md5Hash('test'); // Returns '098f6bcd4621d373cade4e832627b4f6'
```

```dart [Dart]
md5Hash('test'); // Returns '098f6bcd4621d373cade4e832627b4f6'
```

```python [Python]
md5Hash('test')  # Returns '098f6bcd4621d373cade4e832627b4f6'
```

:::
