# decodeBase64 <Lang dart js python />

<NodeRequired ko />

인코딩된 base64 문자열을 일반 문자열로 디코딩합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'encodedStr', type: 'string', required: true }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
decodeBase64('dGhpcyBpcyB0ZXN0'); // Returns 'this is test'
```

:::

::: lang dart

```dart
decodeBase64('dGhpcyBpcyB0ZXN0'); // Returns 'this is test'
```

:::

::: lang python

```python
decodeBase64('dGhpcyBpcyB0ZXN0')  # Returns 'this is test'
```

:::
