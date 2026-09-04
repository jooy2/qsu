# encrypt <Lang js python />

<NodeRequired en />

Encrypt with the algorithm of your choice (algorithm default: `aes-256-cbc`, ivSize default: `16`) using a string and a secret (secret).

`secret` is used as the raw key, so its byte length must match the algorithm: 32 bytes for `aes-256-*`, 24 for `aes-192-*` and 16 for `aes-128-*`. A shorter or longer key throws `Invalid key length`. Note that this is a byte length, not a character count — a multi-byte character takes more than one byte.

The result is `iv:encrypted`. For AEAD algorithms (`gcm`, `ccm`, `ocb`, `poly1305`) it is `iv:authTag:encrypted`, because these modes need the authentication tag to decrypt. Pass the returned string to `decrypt` with the same `algorithm` and `toBase64` values.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true, desc: 'The text to encrypt. An empty string returns an empty string.' },
	{ name: 'secret', type: 'string', required: true, desc: 'The key. Its byte length must match the algorithm (32 bytes for `aes-256-*`).' },
	{ name: 'algorithm', type: 'string', default: `'aes-256-cbc'` },
	{ name: 'ivSize', type: 'number', default: '16', desc: 'The IV byte length. Use `12` for `aes-256-gcm`.' },
	{ name: 'toBase64', type: 'boolean', default: 'false', desc: 'Encode the output as base64 instead of hex.' }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
const secret = '12345678901234567890123456789012'; // 32 bytes

encrypt('test', secret); // 'iv:encrypted'
encrypt('test', secret, 'aes-256-gcm', 12); // 'iv:authTag:encrypted'
```

:::

::: lang python

```python
secret = '12345678901234567890123456789012'  # 32 bytes

encrypt('test', secret)  # 'iv:encrypted'
```

:::
