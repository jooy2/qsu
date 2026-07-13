# sha256Hash <Lang dart js python />

<NodeRequired en />

Converts String data to sha256 hash value and returns it.

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
sha256Hash('test'); // Returns '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
```

```dart [Dart]
sha256Hash('test'); // Returns '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
```

```python [Python]
sha256Hash('test')  # Returns '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
```

:::
