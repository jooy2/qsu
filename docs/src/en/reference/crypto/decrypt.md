# decrypt <Badge type="tip" text="JavaScript" />

Decrypt with the specified algorithm (default: `aes-256-cbc`) using a string and a secret (secret).

## Parameters

- `str::string`
- `secret::string`
- `algorithm::string || 'aes-256-cbc'`

## Returns

> string

## Examples

```javascript
decrypt('61ba43b65fc...', 'secret-key');
```
