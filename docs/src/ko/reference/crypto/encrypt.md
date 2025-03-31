# encrypt <Badge type="tip" text="JavaScript" />

<span class="node-required">Node.js 런타임 필요 ('qsu/node')</span>

문자열과 비밀번호(비밀번호)를 사용하여 원하는 알고리즘(알고리즘 기본값: `aes-256-cbc`, ivSize 기본값: `16`)으로 암호화합니다.

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
