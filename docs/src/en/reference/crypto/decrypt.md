# decrypt

<NodeRequired en />

Decrypt with the specified algorithm (default: `aes-256-cbc`) using a string and a key (`key`).

`str` must be a string produced by `encrypt`: `iv:encrypted`, or `iv:authTag:encrypted` for AEAD algorithms (`gcm`, `ccm`, `ocb`, `poly1305`). The `algorithm` must match the one used to encrypt, and `fromBase64` must match the `toBase64` used there. An input in any other shape throws.

Decryption also throws when the key is wrong or the ciphertext has been altered, so wrap the call in `try`/`catch` when the input is not under your control.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true, desc: 'The string returned by `encrypt`. An empty string returns an empty string.' },
	{ name: 'key', type: 'string', required: true, desc: 'The same key that was used to encrypt.' },
	{ name: 'algorithm', type: 'string', default: `'aes-256-cbc'` },
	{ name: 'fromBase64', type: 'boolean', default: 'false' }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
const key = '12345678901234567890123456789012'; // 32 bytes

decrypt('61ba43b65fc...', key);
decrypt(encrypt('test', key, 'aes-256-gcm', 12), key, 'aes-256-gcm'); // 'test'
```

:::

::: lang dart

```dart
const String key = '12345678901234567890123456789012'; // 32 bytes

decrypt('61ba43b65fc...', key);
decrypt(encrypt('test', key, algorithm: 'aes-256-gcm', ivSize: 12), key,
    algorithm: 'aes-256-gcm'); // 'test'
```

:::

::: lang python

```python
key = '12345678901234567890123456789012'  # 32 bytes

decrypt('61ba43b65fc...', key)
```

:::
