# sha256Hash
<NodeRequired ko />

문자열 데이터를 sha256 해시 값으로 변환하여 반환합니다.

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
sha256Hash('test'); // Returns '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
```

:::

::: lang dart

```dart
sha256Hash('test'); // Returns '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
```

:::

::: lang python

```python
sha256Hash('test')  # Returns '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
```

:::
