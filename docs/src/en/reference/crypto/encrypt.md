# encrypt <Lang js python />

<NodeRequired en />

Encrypt with the algorithm of your choice (algorithm default: `aes-256-cbc`, ivSize default: `16`) using a string and a secret (secret).

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'secret', type: 'string', required: true },
	{ name: 'algorithm', type: 'string', default: `'aes-256-cbc'` },
	{ name: 'ivSize', type: 'number', default: '16' },
	{ name: 'toBase64', type: 'boolean', default: 'false' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
encrypt('test', 'secret-key');
```

```dart [Dart]
encrypt('test', 'secret-key');
```

```python [Python]
encrypt('test', 'secret-key')
```

:::
