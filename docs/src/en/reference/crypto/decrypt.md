# decrypt <Lang js python />

<NodeRequired en />

Decrypt with the specified algorithm (default: `aes-256-cbc`) using a string and a secret (secret).

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'secret', type: 'string', required: true },
	{ name: 'algorithm', type: 'string', default: `'aes-256-cbc'` },
	{ name: 'toBase64', type: 'boolean', default: 'false' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
decrypt('61ba43b65fc...', 'secret-key');
```

```dart [Dart]
decrypt('61ba43b65fc...', 'secret-key');
```

```python [Python]
decrypt('61ba43b65fc...', 'secret-key')
```

:::
