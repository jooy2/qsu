# decrypt <Lang js python />

<NodeRequired ko />

지정된 알고리즘(기본값: `aes-256-cbc`)을 사용하여 문자열과 비밀번호(비밀번호)를 해독합니다.

`str`은 `encrypt`가 반환한 문자열이어야 합니다. 형식은 `iv:암호문`이며, AEAD 계열 알고리즘(`gcm`, `ccm`, `ocb`, `poly1305`)은 `iv:인증태그:암호문`입니다. `algorithm`과 `toBase64`는 암호화할 때와 동일한 값을 지정해야 합니다. 그 외 형식의 입력은 오류가 발생합니다.

키가 다르거나 암호문이 변조된 경우에도 오류가 발생하므로, 신뢰할 수 없는 입력을 다룰 때는 `try`/`catch`로 감싸는 것이 좋습니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true, desc: '`encrypt`가 반환한 문자열입니다. 빈 문자열을 전달하면 빈 문자열을 반환합니다.' },
	{ name: 'secret', type: 'string', required: true, desc: '암호화에 사용한 것과 동일한 키입니다.' },
	{ name: 'algorithm', type: 'string', default: `'aes-256-cbc'` },
	{ name: 'toBase64', type: 'boolean', default: 'false' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
const secret = '12345678901234567890123456789012'; // 32바이트

decrypt('61ba43b65fc...', secret);
decrypt(encrypt('test', secret, 'aes-256-gcm', 12), secret, 'aes-256-gcm'); // 'test'
```

```python [Python]
secret = '12345678901234567890123456789012'  # 32바이트

decrypt('61ba43b65fc...', secret)
```

:::
