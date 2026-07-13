# sha1Hash <Lang dart js python />

<NodeRequired ko />

문자열 데이터를 sha1 해시 값으로 변환하여 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'encoding', type: `'hex' | 'base64' | 'base64url' | 'binary'`, named: true, default: `'hex'` }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
sha1Hash('test'); // Returns 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'
```

```dart [Dart]
sha1Hash('test'); // Returns 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'
```

```python [Python]
sha1Hash('test')  # Returns 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'
```

:::
