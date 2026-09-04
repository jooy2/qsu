# sha512Hash <Lang dart js python />

<NodeRequired ko />

문자열 데이터를 sha512 해시 값으로 변환하여 반환합니다.

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
sha512Hash('test'); // Returns 'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff'
```

:::

::: lang dart

```dart
sha512Hash('test'); // Returns 'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff'
```

:::

::: lang python

```python
sha512Hash('test')  # Returns 'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff'
```

:::
