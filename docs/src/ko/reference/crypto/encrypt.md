# encrypt <Lang js python />

<NodeRequired ko />

문자열과 비밀번호(비밀번호)를 사용하여 원하는 알고리즘(알고리즘 기본값: `aes-256-cbc`, ivSize 기본값: `16`)으로 암호화합니다.

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
