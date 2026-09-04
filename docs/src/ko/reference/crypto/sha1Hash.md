# sha1Hash
<NodeRequired ko />

문자열 데이터를 sha1 해시 값으로 변환하여 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'encoding', type: { js: `'hex' | 'base64' | 'base64url' | 'binary'`, dart: 'BinaryToTextEncoding' }, named: true, default: `'hex'` }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
sha1Hash('test'); // Returns 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'
```

:::

::: lang dart

```dart
sha1Hash('test'); // Returns 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'
```

:::

::: lang python

```python
sha1Hash('test')  # Returns 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'
```

:::
