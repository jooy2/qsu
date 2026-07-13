# decodeBase64 <Lang dart js python />

<NodeRequired ko />

인코딩된 base64 문자열을 일반 문자열로 디코딩합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'encodedStr', type: 'string', required: true }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
decodeBase64('dGhpcyBpcyB0ZXN0'); // Returns 'this is test'
```

```dart [Dart]
decodeBase64('dGhpcyBpcyB0ZXN0'); // Returns 'this is test'
```

```python [Python]
decodeBase64('dGhpcyBpcyB0ZXN0')  # Returns 'this is test'
```

:::
