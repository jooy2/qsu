# decrypt <Lang js python />

<NodeRequired ko />

지정된 알고리즘(기본값: `aes-256-cbc`)을 사용하여 문자열과 비밀번호(비밀번호)를 해독합니다.

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
