# decrypt <Lang js python />

<NodeRequired en />

Decrypt with the specified algorithm (default: `aes-256-cbc`) using a string and a secret (secret).

`str` must be a string produced by `encrypt`: `iv:encrypted`, or `iv:authTag:encrypted` for AEAD algorithms (`gcm`, `ccm`, `ocb`, `poly1305`). The `algorithm` and `toBase64` values must match the ones used to encrypt. An input in any other shape throws.

Decryption also throws when the key is wrong or the ciphertext has been altered, so wrap the call in `try`/`catch` when the input is not under your control.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true, desc: 'The string returned by `encrypt`. An empty string returns an empty string.' },
	{ name: 'secret', type: 'string', required: true, desc: 'The same key that was used to encrypt.' },
	{ name: 'algorithm', type: 'string', default: `'aes-256-cbc'` },
	{ name: 'toBase64', type: 'boolean', default: 'false' }
]" />

## Returns

> string

## Examples

::: lang js

```javascript
const secret = '12345678901234567890123456789012'; // 32 bytes

decrypt('61ba43b65fc...', secret);
decrypt(encrypt('test', secret, 'aes-256-gcm', 12), secret, 'aes-256-gcm'); // 'test'
```

:::

::: lang python

```python
secret = '12345678901234567890123456789012'  # 32 bytes

decrypt('61ba43b65fc...', secret)
```

:::
