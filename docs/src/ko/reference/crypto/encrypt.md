# encrypt <Lang js python />

<NodeRequired ko />

문자열과 비밀번호(비밀번호)를 사용하여 원하는 알고리즘(알고리즘 기본값: `aes-256-cbc`, ivSize 기본값: `16`)으로 암호화합니다.

`secret`은 키로 그대로 사용되므로 알고리즘에 맞는 바이트 길이여야 합니다. `aes-256-*`는 32바이트, `aes-192-*`는 24바이트, `aes-128-*`는 16바이트입니다. 길이가 맞지 않으면 `Invalid key length` 오류가 발생합니다. 글자 수가 아니라 **바이트 길이** 기준이므로, 여러 바이트를 차지하는 문자(예: 한글)를 사용할 때 주의해야 합니다.

반환 형식은 `iv:암호문`입니다. AEAD 계열 알고리즘(`gcm`, `ccm`, `ocb`, `poly1305`)은 복호화에 인증 태그가 필요하므로 `iv:인증태그:암호문` 형식입니다. 반환된 문자열은 `algorithm`과 `toBase64` 값을 동일하게 지정하여 `decrypt`에 전달하면 됩니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true, desc: '암호화할 문자열입니다. 빈 문자열을 전달하면 빈 문자열을 반환합니다.' },
	{ name: 'secret', type: 'string', required: true, desc: '키입니다. 알고리즘에 맞는 바이트 길이여야 합니다(`aes-256-*`는 32바이트).' },
	{ name: 'algorithm', type: 'string', default: `'aes-256-cbc'` },
	{ name: 'ivSize', type: 'number', default: '16', desc: 'IV의 바이트 길이입니다. `aes-256-gcm`에서는 `12`를 사용합니다.' },
	{ name: 'toBase64', type: 'boolean', default: 'false', desc: '결과를 hex 대신 base64로 인코딩합니다.' }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
const secret = '12345678901234567890123456789012'; // 32바이트

encrypt('test', secret); // 'iv:암호문'
encrypt('test', secret, 'aes-256-gcm', 12); // 'iv:인증태그:암호문'
```

:::

::: lang python

```python
secret = '12345678901234567890123456789012'  # 32바이트

encrypt('test', secret)  # 'iv:암호문'
```

:::
