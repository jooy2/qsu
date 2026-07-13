# sha512Hash <Lang dart js python />

<NodeRequired en />

Converts String data to sha512 hash value and returns it.

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
sha512Hash('test'); // Returns 'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff'
```

```dart [Dart]
sha512Hash('test'); // Returns 'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff'
```

```python [Python]
sha512Hash('test')  # Returns 'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff'
```

:::
