# encrypt <Lang js />

<NodeRequired en />

Encrypt with the algorithm of your choice (algorithm default: `aes-256-cbc`, ivSize default: `16`) using a string and a secret (secret).

## Parameters

- `str::string`
- `secret::string`
- `algorithm::string || 'aes-256-cbc'`
- `ivSize::number || 16`

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

:::
