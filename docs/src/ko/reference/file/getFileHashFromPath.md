# getFileHashFromPath <Lang js dart python />

<NodeRequired ko />

지정된 경로에 있는 파일을 특정 알고리즘으로 해시된 값으로 반환합니다. 기본 알고리즘은 `md5`입니다. 이 메서드는 `Promise`를 사용하여 유효한 해시 값을 반환합니다.

::: warning
기본값이 `md5`인 이유는 이 함수가 주로 두 파일이 같은지 구분하는 데 쓰이기 때문입니다. 암호학적 해시로서의 `md5`는 이미 깨져 있어 충돌을 의도적으로 만들 수 있으므로, 위조 시도에 대해 신뢰해야 하는 값이라면 `sha256`을 사용하세요.
:::

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File path' },
	{ name: 'algorithm', type: `'md5' | 'sha1' | 'sha256' | 'sha512'`, named: true, default: `'md5'`, desc: 'OpenSSL algorithm to be used for file hashing' }
]" />

## Returns

<ReturnType type="Promise<string>" />

## Examples

::: lang js

```javascript
await getFileHashFromPath('/home/user/text.txt', 'sha1'); // '38851813f75627d581c593f3ccfb7061dd013fbd'
```

:::

::: lang dart

```dart
await getFileHashFromPath('/home/user/text.txt', algorithm: 'sha1'); // '38851813f75627d581c593f3ccfb7061dd013fbd'
```

:::

::: lang python

```python
getFileHashFromPath('/home/user/text.txt', 'sha1') # '38851813f75627d581c593f3ccfb7061dd013fbd'
```

:::
