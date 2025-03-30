# decrypt <Badge type="tip" text="JavaScript" />

<span class="node-required">Requires a Node.js runtime ('qsu/node')</span>

Decrypt with the specified algorithm (default: `aes-256-cbc`) using a string and a secret (secret).

## Parameters

- `str::string`
- `secret::string`
- `algorithm::string || 'aes-256-cbc'`

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

:::
